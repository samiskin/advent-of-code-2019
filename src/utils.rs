use std::path::Path;
use std::fs::File;
use std::io::prelude::*;

pub fn read_file(path: &str) -> std::io::Result<String> {
    // Create a path to the desired file
    let path = Path::new(path);

    // Open the path in read-only mode, returns `io::Result<File>`
    let mut file = File::open(&path)?;

    // Read the file contents into a string, returns `io::Result<usize>`
    let mut s = String::new();
    file.read_to_string(&mut s)?;
    Ok(s)
}

pub fn range_n(nums: Vec<i32>) -> Vec<Vec<i32>> {
    let range: Vec<i32> = (0..nums[0]).collect();
    if nums.len() == 1 {
        return range.into_iter().map(|i| [i].to_vec()).collect();
    } else {
        let nested = range_n(nums.into_iter().skip(1).collect());
        range
            .iter()
            .flat_map(move |i| {
                let mut output = [].to_vec();
                for nest in nested.iter() {
                    let mut merged = [*i].to_vec();
                    merged.extend(nest);
                    output.push(merged);
                }
                output
            })
            .collect::<Vec<Vec<i32>>>()
    }
}

#[cfg(test)]
mod test {
    use super::*;

    #[test]
    fn test_range_n() {
        assert_eq!(
            range_n([3, 2].to_vec()),
            [
                [0, 0].to_vec(),
                [0, 1].to_vec(),
                [1, 0].to_vec(),
                [1, 1].to_vec(),
                [2, 0].to_vec(),
                [2, 1].to_vec(),
            ]
            .to_vec()
        );
        assert_eq!(
            range_n([2, 2, 2].to_vec()),
            [
                [0, 0, 0].to_vec(),
                [0, 0, 1].to_vec(),
                [0, 1, 0].to_vec(),
                [0, 1, 1].to_vec(),
                [1, 0, 0].to_vec(),
                [1, 0, 1].to_vec(),
                [1, 1, 0].to_vec(),
                [1, 1, 1].to_vec(),
            ]
            .to_vec()
        );
    }
}
