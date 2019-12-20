use std::cmp;
use std::collections::*;

#[derive(Debug, PartialEq, Clone)]
struct Line {
    a: (i32, i32),
    b: (i32, i32),
}

fn cmd_to_offsets(cmd: &str) -> Vec<(i32, i32)> {
    let mut chars_iter = cmd.chars();
    let dir = chars_iter.next().unwrap();
    let offset = chars_iter.collect::<String>().parse::<i32>().unwrap();
    match dir {
        'R' => (1..offset + 1).map(|o| (o, 0)).collect(),
        'L' => (1..offset + 1).map(|o| (-o, 0)).collect(),
        'U' => (1..offset + 1).map(|o| (0, o)).collect(),
        'D' => (1..offset + 1).map(|o| (0, -o)).collect(),
        _ => panic!("Invalid direction"),
    }
}

fn cmds_to_points(cmds: &str) -> Vec<(i32, i32)> {
    cmds.split(',')
        .map(cmd_to_offsets)
        .fold([].to_vec(), |mut vec: Vec<(i32, i32)>, offsets| {
            let (sx, sy) = vec.last().unwrap_or(&(0, 0)).clone();
            for (x, y) in offsets {
                vec.push((sx + x, sy + y));
            }
            vec
        })
}

fn get_intersections(dirs_a: &str, dirs_b: &str) -> HashMap<(i32, i32), i32> {
    let mut distances_a: HashMap<(i32, i32), i32> = HashMap::new();
    let mut distances_b: HashMap<(i32, i32), i32> = HashMap::new();

    let mut counter_a = 0;
    for point in cmds_to_points(dirs_a) {
        counter_a += 1;
        if !distances_a.contains_key(&point) {
            distances_a.insert(point, counter_a);
        }
    }
    let mut counter_b = 0;
    for point in cmds_to_points(dirs_b) {
        counter_b += 1;
        if !distances_b.contains_key(&point) {
            distances_b.insert(point, counter_b);
        }
    }

    let points_a = cmds_to_points(dirs_a)
        .into_iter()
        .collect::<HashSet<(i32, i32)>>();
    let points_b = cmds_to_points(dirs_b)
        .into_iter()
        .collect::<HashSet<(i32, i32)>>();
    let mut intersection_distances: HashMap<(i32, i32), i32> = HashMap::new();

    for point_b in points_b {
        if points_a.contains(&point_b) {
           intersection_distances.insert(point_b, distances_a.get(&point_b).unwrap() + distances_b.get(&point_b).unwrap());
        }
    }
    intersection_distances
}

pub fn run(program: &str) -> std::io::Result<String> {
    let mut lines = program.lines();
    let (dirs_a, dirs_b) = (lines.next().unwrap(), lines.next().unwrap());
    let intersections = get_intersections(dirs_a, dirs_b);
    let min = intersections
        .iter()
        .filter(|((x, y), dist)| *x != 0 || *y != 0)
        .fold(std::i32::MAX, |prev, ((x, y), dist)| cmp::min(prev, *dist));
    Ok(min.to_string())
}


fn get_step(dir: &char) -> (i32, i32) {
    match dir {
        'R' => (1, 0),
        'L' => (-1, 0),
        'U' => (0, 1),
        'D' => (0, -1),
        _ => panic!("Invalid direction"),
    }
}
fn parse_cmd(cmd: &str) -> (char, i32) {
    let mut chars_iter = cmd.chars();
    let dir = chars_iter.next().unwrap();
    let offset = chars_iter.collect::<String>().parse::<i32>().unwrap();
    (dir, offset)
}
fn get_path_points(cmds: &Vec<(char, i32)>) -> Vec<(i32, i32)> {
    cmds.iter().fold(vec![(0, 0)], |mut path, (dir, len)| {
        let (dx, dy) = get_step(dir);
        for i in 1..=*len {
            let (sx, sy) = path.last().unwrap().clone();
            path.push((sx + dx, sy + dy));
        }
        path
    })
}
pub fn run_new(program: &str) -> i32 {
    let mut lines = program.lines().map(|s| s.split(',').map(parse_cmd).collect());
    let (dirs_a, dirs_b) = (lines.next().unwrap(), lines.next().unwrap());
    get_path_points(&dirs_a);
    4
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::utils;

    #[test]
    fn test_day3_run() {
        let input = utils::read_file("res/day3.in").unwrap();
        let output = run(&input).unwrap();
        assert_eq!(output, "6084");
    }
}
