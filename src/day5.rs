fn parse_opcode(num: i32) -> (i32, bool, bool, bool) {
    let de = num % 100;
    let c = (num / 100) % 10 == 1;
    let b = (num / 1000) % 10 == 1;
    let a = (num / 10000) % 10 == 1;
    (de, c, b, a)
}

pub fn run(program: &str) -> std::io::Result<String> {
    let mut numbers: Vec<i32> = program
        .trim_end()
        .split(",")
        .map(|s| s.parse::<i32>().unwrap())
        .collect();

    numbers.extend((0..1000).map(|_| 0));

    let mut done = false;
    let mut i = 0;

    let mut output = String::new();

    let get_val = |nums: &Vec<i32>, param: usize, mode: bool| -> i32 {
        if mode == false {
            nums[nums[param] as usize]
        } else {
            nums[param]
        }
    };

    while !done && i < numbers.len() {
        let (de, a, b, c) = parse_opcode(numbers[i]);
        // print!("{} {} {} {} {}\n", i, de, a, b, c);
        match de {
            1 => {
                let a = get_val(&numbers, i + 1, a);
                let b = get_val(&numbers, i + 2, b);
                let target = numbers[i + 3];
                numbers[target as usize] = a + b;
                i += 4;
            }
            2 => {
                let a = get_val(&numbers, i + 1, a);
                let b = get_val(&numbers, i + 2, b);
                let target = numbers[i + 3];
                numbers[target as usize] = a * b;
                i += 4;
            }
            3 => {
                let target = get_val(&numbers, i + 1, true);
                numbers[target as usize] = 5;
                i += 2;
            }
            4 => {
                output = output + "\n" + &get_val(&numbers, i + 1, false).to_string();
                i += 2;
            }
            5 => {
                let index = get_val(&numbers, i + 1, a);
                if index != 0 {
                    i = get_val(&numbers, i + 2, b) as usize;
                } else {
                    i += 3;
                }
            }
            6 => {
                let index = get_val(&numbers, i + 1, a);
                if index == 0 {
                    i = get_val(&numbers, i + 2, b) as usize;
                } else {
                    i += 3;
                }
            }
            7 => {
                let a = get_val(&numbers, i + 1, a);
                let b = get_val(&numbers, i + 2, b);
                let target = numbers[i + 3];
                if a < b {
                    numbers[target as usize] = 1;
                } else {
                    numbers[target as usize] = 0;
                }
                i += 4;
            }
            8 => {
                let a = get_val(&numbers, i + 1, a);
                let b = get_val(&numbers, i + 2, b);
                let target = numbers[i + 3];
                if a == b {
                    numbers[target as usize] = 1;
                } else {
                    numbers[target as usize] = 0;
                }
                i += 4;
            }
            99 => {
                print!("Halting! {}\n", numbers[223]);
                done = true
            }
            _ => {
                print!("Unknown opcode {}", de);
                done = true;
            }
        }
    }
    print!("{}", output);
    Ok(output)
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::utils;

    #[test]
    fn test_parse_opcode() {
        assert_eq!(parse_opcode(1002), (2, false, true, false));
        assert_eq!(parse_opcode(11099), (99, false, true, true));
    }

    #[test]
    fn test_simple_d5() {
        // let cases = [
        //     ["1,9,10,3,2,3,11,0,99,30,40,50", "3500"],
        //     ["1,0,0,0,99", "2"],
        //     ["2,3,0,3,99", "2"],
        //     ["2,4,4,5,99,0", "2"],
        //     ["1,1,1,4,99,5,6,0,99", "30"],
        // ];
        let cases = [
            ["3,0,4,0,99", "2\n"],
            // ["1,0,0,0,99", "2"],
            // ["2,3,0,3,99", "2"],
            // ["2,4,4,5,99,0", "2"],
            // ["1,1,1,4,99,5,6,0,99", "30"],
        ];
        for case in cases.iter() {
            assert_eq!(run(case[0]).unwrap(), case[1]);
        }
    }

    #[test]
    fn test_run_d5() {
        let input = utils::read_file("day5.in").unwrap();
        let output = run(&input).unwrap();
        // let mut part2 = "invalid".to_string();
        // for noun in 0..99 {
        //     for verb in 0..99 {
        //         let result = run(&add_input(&input, noun, verb)).unwrap();
        //         if result == "19690720" {
        //             part2 = (100 * noun + verb).to_string();
        //         }
        //     }
        // }
        let out_file = utils::read_file("day2.out").unwrap();
        let target_output = out_file.trim_end();
        // let output = part1 + "\n" + &part2;
        assert_eq!(output, target_output);
    }
}
