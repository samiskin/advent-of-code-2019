pub fn run(strings: &str) -> std::io::Result<String> {
    let sum = strings
        .lines()
        .map(|line| line.parse::<i32>().unwrap())
        .map(|w| get_fuel(w))
        .fold(0, |f, s| s + f);
    Ok(sum.to_string())
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
        // assert_eq!(get_fuel(12), 2);
        // assert_eq!(get_fuel(14), 2);
        // assert_eq!(get_fuel(1969), 654);
        // assert_eq!(get_fuel(100756), 33583);
        assert_eq!(get_fuel(100756), 50346)
    }

    #[test]
    fn test_run_day1() {
        let input = utils::read_file("day1.in").unwrap();
        print!("{}", input);
        let output = run(&input).unwrap();
        let out_file = utils::read_file("day1.out").unwrap();
        let target_output = out_file.trim_end();
        assert_eq!(output, target_output);
    }
}
