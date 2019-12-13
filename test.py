import math

def read_input(filename):
  with open(filename) as f:
    return list(map(int, f.readline().split(',')))

def read(data, pointer, parameter, immediate_mode):
  pos = pointer + parameter
  if immediate_mode:
    return data[pos]
  else:
    return data[data[pos]]

def write(data, pointer, parameter, value):
  pos = pointer + parameter
  data[data[pos]] = value

def digit(number, place):
  return (number // (math.floor(math.pow(10,place))))%10

def run(data, program_input):

  program_output = None
  pointer = 0

  while True:
    op = data[pointer]
    mode1 = digit(op, 2)
    mode2 = digit(op, 3)
    mode3 = digit(op, 4)
    op = op % 100
    if op == 99:
      break
    if op == 1:  # Add
      val1 = read(data, pointer, 1, mode1)
      val2 = read(data, pointer, 2, mode2)
      write(data, pointer, 3, val1 + val2)
      pointer +=4
    elif op == 2:  # Mult
      val1 = read(data, pointer, 1, mode1)
      val2 = read(data, pointer, 2, mode2)
      write(data, pointer, 3, val1 * val2)
      pointer +=  4
    elif op == 3:  # Input
      write(data, pointer, 1, program_input)
      pointer += 2
    elif op == 4:  # Output
      program_output = read(data, pointer, 1, False)
      pointer += 2
    elif op == 5:  #jump-if-true
      val1 = read(data, pointer, 1, mode1)
      val2 = read(data, pointer, 2, mode2)
      if val1 != 0:
        pointer = val2
      else:
        pointer +=3
    elif op == 6:  #jump-if-false
      val1 = read(data, pointer, 1, mode1)
      val2 = read(data, pointer, 2, mode2)
      if val1 == 0:
        pointer = val2
      else:
        pointer +=3
    elif op == 7:  # less than
      val1 = read(data, pointer, 1, mode1)
      val2 = read(data, pointer, 2, mode2)
      write(data, pointer, 3, 1 if val1 < val2 else 0)
      pointer += 4
    elif op == 8: #eq
      val1 = read(data, pointer, 1, mode1)
      val2 = read(data, pointer, 2, mode2)
      write(data, pointer, 3, 1 if val1 == val2 else 0)
      pointer += 4
    else:
      raise Exception(f'oh no, val at {pointer} is {op}')
  return program_output

def main():
  data = read_input('day5.in')
  print(str(run(data, 5)))

if __name__ == '__main__':
    main()
