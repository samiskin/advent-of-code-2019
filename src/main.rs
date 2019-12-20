#![allow(dead_code)]
#![allow(unused_variables)]

mod day1;
mod day2;
mod day3;
mod day4;
mod day5;
mod day6;
mod day7;
mod day8;
mod utils;

fn main() -> std::io::Result<()> {
    let result = day6::part2(&utils::read_file("day6.in")?);
    print!("{:?}", result);
    Ok(())
}

