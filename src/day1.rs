pub fn run(strings: &str) -> i32 {
    strings
        .lines()
        .map(|line| line.parse::<i32>().unwrap())
        .map(|w| get_fuel(w))
        .fold(0, |f, s| s + f)
}

fn get_fuel(m: i32) -> i32 {
    let fuel = (m / 3) - 2;
    if fuel < 0 {
        return 0;
    }
    return fuel + get_fuel(fuel)
}

#[cfg(test)]
mod tests {
    use crate::utils;
    use super::*;

    #[test]
    fn test_add() {
        assert_eq!(get_fuel(100756), 50346)
    }

    #[test]
    fn test_day1_run() {
        let input = utils::read_file("res/day1.in").unwrap();
        let output = run(&input);
        assert_eq!(output, 5194211);
    }
}
