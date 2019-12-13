use crate::utils::range_n;
use std::collections::*;

fn digit(num: i32, place: u32) -> u32 {
    ((num / i32::pow(10, place - 1)) % 10) as u32
}

fn parse_op(op: i32) -> (i32, Vec<u32>) {
    (
        op % 100,
        [digit(op, 3), digit(op, 4), digit(op, 5)].to_vec(),
    )
}

fn get_addr(mem: &Vec<i32>, i: usize, mode: u32, base: i32) -> usize {
    match mode {
        0 => mem[i] as usize,
        1 => i,
        2 => (base + mem[i]) as usize,
        _ => panic!("Invalid get_addr mode {}", mode),
    }
}

fn num_args(op: i32) -> u32 {
    if [3, 4, 9].contains(&op) {
        2
    } else if [5, 6].contains(&op) {
        3
    } else {
        4
    }
}

struct Program {
    i: usize,
    base: i32,
    mem: Vec<i32>,
    input_queue: VecDeque<i32>,
}

impl Program {
    pub fn new(source: &str) -> Program {
        Program {
            i: 0,
            base: 0,
            mem: source
                .trim_end()
                .split(",")
                .map(|s| s.parse::<i32>().unwrap())
                .collect(),
            input_queue: VecDeque::new(),
        }
    }
    fn exec(&mut self, inputs: Vec<i32>) -> Option<i32> {
        self.input_queue.extend(inputs.into_iter());

        loop {
            let (op, modes) = parse_op(self.mem[self.i]);
            if op == 99 {
                return None;
            }
            let addrs: Vec<usize> = (0..num_args(op) - 1)
                .map(|d| {
                    get_addr(
                        &self.mem,
                        ((self.i as u32) + 1 + d) as usize,
                        modes[d as usize],
                        self.base,
                    )
                })
                .collect();
            let vals: Vec<i32> = addrs.iter().map(|addr| self.mem[*addr]).collect();
            self.i += num_args(op) as usize;

            match op {
                1 => self.mem[addrs[2]] = vals[0] + vals[1],
                2 => self.mem[addrs[2]] = vals[0] * vals[1],
                5 => {
                    if vals[0] != 0 {
                        self.i = vals[1] as usize
                    }
                }
                6 => {
                    if vals[0] == 0 {
                        self.i = vals[1] as usize
                    }
                }
                7 => self.mem[addrs[2]] = if vals[0] < vals[1] { 1 } else { 0 },
                8 => self.mem[addrs[2]] = if vals[0] == vals[1] { 1 } else { 0 },
                9 => self.base += vals[0],

                3 => {
                    print!("Input {:?}\n", self.input_queue.front().unwrap());
                    match self.input_queue.pop_front() {
                        Some(input) => self.mem[addrs[0]] = input,
                        None => {
                            self.i -= num_args(op) as usize;
                            return None;
                        }
                    }
                }
                4 => return Some(vals[0]),

                _ => panic!("Invalid opcode"),
            }
        }
    }
}

pub fn run(program: &str, inputs: Vec<i32>) -> i32 {
    let mut programs: Vec<Program> = (0..5).map(|_| Program::new(program)).collect();
    let mut carry = 0;
    let mut any_done = false;
    while !any_done {
        for (i, prog) in programs.iter_mut().enumerate() {
            let outputs = prog.exec([inputs[i], carry].to_vec());
            match outputs {
                Some(val) => carry = val,
                None => {
                    any_done = true;
                    break;
                }
            }
        }
    }
    carry
}

pub fn find_max(program: &str) -> i32 {
    range_n(vec![2, 2, 2, 2]).iter().filter(|arr| {
        let mut used = vec![];
        arr.iter().fold(true, |carry, i| if used.contains(i) {
            false
        } else {
            used.push(*i);
            carry
        })
    }).fold(0, |a, b| { print!("{:?}", b); 0 })
}

#[cfg(test)]
mod test {
    use super::*;

    #[test]
    fn test_digit() {
        assert_eq!(digit(1002, 1), 2);
        assert_eq!(digit(4321, 3), 3);
    }

    #[test]
    fn test_day7() {
        assert_eq!(
            run(
                "3,23,3,24,1002,24,10,24,1002,23,-1,23,101,5,23,23,1,24,23,23,4,23,99,0,0",
                [0, 1, 2, 3, 4].to_vec()
            ),
            54321
        );
    }
}
