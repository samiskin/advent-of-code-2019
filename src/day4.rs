
pub fn validate_num(num: i32) -> bool {
    let string: String = num.to_string();
    let mut chars = string.chars();

    let mut last_c = chars.next().unwrap();
    let mut found_same = false;
    let mut streak_counter = 1;
    for c in chars {
        if c == last_c {
            streak_counter += 1;
        } else if c < last_c {
            return false;
        } else {
            if streak_counter == 2 {
                found_same = true
            }
            streak_counter = 1;
        }
        last_c = c;
    }
    return found_same || streak_counter == 2;
}

pub fn run(start: i32, end: i32) -> i32 {
    let mut count = 0;
    for i in start..end {
        if validate_num(i) {
            count += 1;
        }
    }
    return count;
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_validate_num() {
        assert!(validate_num(122345));
        // assert!(validate_num(111111));
        assert!(!validate_num(223450));
        assert!(!validate_num(123789));
        assert!(validate_num(112233));
        assert!(!validate_num(123444));
        assert!(validate_num(111122));
        assert!(!validate_num(101122));
    }

    #[test]
    fn test_run_day4() {
        assert_eq!(run(372037, 905157), 0);
    }
}
