pub fn run(program: &str) -> std::io::Result<String> {
    let mut numbers = program
        .trim_end()
        .split(",")
        .map(|s| s.parse::<i32>().unwrap())
        .collect::<Vec<i32>>();

    let mut done = false;
    let mut i = 0;
    while !done {
        let opcode = numbers[i];
        match opcode {
            1 => {
                let a = numbers[numbers[i + 1] as usize];
                let b = numbers[numbers[i + 2] as usize];
                let target = numbers[i + 3] as usize;
                numbers[target] = a + b;
            }
            2 => {
                let a = numbers[numbers[i + 1] as usize];
                let b = numbers[numbers[i + 2] as usize];
                let target = numbers[i + 3] as usize;
                numbers[target] = a * b;
            }
            99 => {
                done = true
            }
            _ => ()
        }
        i += 4;
    }
    let result = numbers[0];
    Ok(result.to_string())
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::utils;

    #[test]
    fn test_simple() {
        let cases = [
            [ "1,9,10,3,2,3,11,0,99,30,40,50", "3500" ],
            [ "1,0,0,0,99", "2" ],
            [ "2,3,0,3,99", "2" ],
            [ "2,4,4,5,99,0", "2" ],
            [ "1,1,1,4,99,5,6,0,99", "30" ],
        ];
        for case in cases.iter() {
            assert_eq!(run(case[0]).unwrap(), case[1]);
        }
    }


    fn add_input(program: &str, noun: i32, verb: i32) -> String {
        let mut arr = program
            .split(",")
            .collect::<Vec<&str>>();
        let noun = noun.to_string();
        let verb = verb.to_string();
        arr[1] = &noun;
        arr[2] = &verb;
        arr.join(",")
    }


    #[test]
    fn test_run() {
        let input = utils::read_file("day2.in").unwrap();
        let part1 = run(&add_input(&input, 12, 2)).unwrap();
        let mut part2 = "invalid".to_string();
        for noun in 0..99 {
            for verb in 0..99 {
                let result = run(&add_input(&input, noun, verb)).unwrap();
                if result == "19690720" {
                    part2 = (100 * noun + verb).to_string();
                }
            }
        }
        let out_file = utils::read_file("day2.out").unwrap();
        let target_output = out_file.trim_end();
        let output = part1 + "\n" + &part2;
        assert_eq!(output, target_output);
    }
}
