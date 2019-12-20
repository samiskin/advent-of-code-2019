struct Program {
    i: usize,
    mem: Vec<i32>,

}

impl Program {
    pub fn new(source: &str) -> Program {
        Program {
            i: 0,
            mem: source
                .trim_end()
                .split(",")
                .map(|s| s.parse::<i32>().unwrap())
                .collect(),
        }
    }
    fn run(&mut self) -> i32 {
        loop {
            let opcode = self.mem[self.i];
            if opcode == 99 { 
                return self.mem[0];
            }
            let addrs = [self.mem[self.i + 1], self.mem[self.i + 2], self.mem[self.i + 3]];
            let vals = [self.mem[addrs[0] as usize], self.mem[addrs[1] as usize]];
            match opcode {
                1 => {
                    self.mem[addrs[2] as usize] = vals[0] + vals[1];
                }
                2 => {
                    self.mem[addrs[2] as usize] = vals[0] * vals[1];
                }
                _ => ()
            }
            self.i += 4;
        }
    }
}

pub fn run(program: &str) -> Option<i32> {
    for noun in 0..99 {
        for verb in 0..99 {
            let mut program = Program::new(program);
            program.mem[1] = noun;
            program.mem[2] = verb;
            if program.run() == 19690720 {
                return Some(100 * noun + verb);
            }
        }
    }
    None
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::utils;

    #[test]
    fn test_day2_run() {
        let input = utils::read_file("res/day2.in").unwrap();
        let output = run(&input);
        assert_eq!(output.unwrap(), 5335);
    }
}
