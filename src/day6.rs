use std::collections::*;

fn parse(input: &str) -> (HashSet<&str>, HashMap<&str, &str>) {
    let orbits: Vec<(&str, &str)> = input
        .trim()
        .split('\n')
        .map(|s| s.split(')').collect::<Vec<&str>>())
        .map(|v| (v[0], v[1]))
        .collect();

    let (entities, orbits) = orbits.iter().fold(
        (HashSet::new(), HashMap::new()),
        |(mut set, mut map), (center, orbiter)| {
            set.insert(*center);
            set.insert(*orbiter);
            map.insert(*orbiter, *center);
            (set, map)
        },
    );

    (entities, orbits)
}

pub fn part1(input: &str) -> i32 {
    let (entities, orbits) = parse(input);

    fn num_children(map: &HashMap<&str, &str>, source: &str) -> i32 {
        match map.get(source) {
            Some(child) => 1 + num_children(map, child),
            None => 0
        }
    };
    let sum = entities.iter().fold(0, |sum, entity| {
        sum + num_children(&orbits, entity)
    });

    sum
}

pub fn part2(input: &str) -> i32 {
    let (entities, orbits) = parse(input);

    let start = "YOU";
    fn traverse<'a>(entities: &'a HashMap<&str, &str>, start: &'static str) -> Vec<&'a str> {
        let mut vec = Vec::new();
        let mut curr: Option<&&str> = Some(&start);
        while curr.is_some() {
            let curr_str: &str = curr.unwrap();
            vec.push(curr_str);
            curr = entities.get(curr_str);
        }
        vec
    }

    let mut path_you = traverse(&orbits, "YOU");
    let mut path_san = traverse(&orbits, "SAN");

    while path_you.last().unwrap() == path_san.last().unwrap() {
        path_you.pop();
        path_san.pop();
    }

    path_you.len() as i32 + path_san.len() as i32 - 2
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::utils;
    #[test]
    fn day6_test1_real() {
        let input = utils::read_file("res/day6.in").unwrap();
        assert_eq!(part1(&input), 247089);
    }

    #[test]
    fn day6_test2_real() {
        let input = utils::read_file("res/day6.in").unwrap();
        assert_eq!(part2(&input), 442);
    }
}
