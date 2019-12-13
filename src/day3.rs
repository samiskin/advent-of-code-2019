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
        // .fold(std::i32::MAX, |prev, ((x, y), dist)| cmp::min(prev, x.abs() + y.abs()));
        .fold(std::i32::MAX, |prev, ((x, y), dist)| cmp::min(prev, *dist));
    Ok(min.to_string())
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::utils;

    // #[test]
    // fn test_get_intersections() {
    //     assert_eq!(
    //         get_intersections("R8,U5,L5,D3", "U7,R6,D4,L4"),
    //         [(6, 5), (3, 3)]
    //     );
    // }

    #[test]
    fn test_cmd_to_offsets() {
        assert_eq!(cmd_to_offsets("R1"), [(1, 0)]);
        assert_eq!(cmd_to_offsets("L4"), [(-1, 0), (-2, 0), (-3, 0), (-4, 0)]);
    }

    #[test]
    fn test_simple() {
        let cases = [
            ["R8,U5,L5,D3\nU7,R6,D4,L4", "6"],
            [
                "R75,D30,R83,U83,L12,D49,R71,U7,L72\nU62,R66,U55,R34,D71,R55,D58,R83",
                "159",
            ],
            [
                "R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51\nU98,R91,D20,R16,D67,R40,U7,R15,U6,R7",
                "135",
            ],
        ];
        for case in cases.iter() {
            assert_eq!(run(case[0]).unwrap(), case[1]);
        }
    }

    #[test]
    fn test_run() {
        let input = utils::read_file("day3.in").unwrap();
        let output = run(&input).unwrap();
        let out_file = utils::read_file("day3.out").unwrap();
        let target_output = out_file.trim_end();
        assert_eq!(output, target_output);
    }
}
