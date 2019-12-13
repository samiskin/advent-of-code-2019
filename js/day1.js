const _ = require('lodash');

var input = `
141923
145715
63157
142712
147191
96667
117032
98123
135120
90609
132022
61962
110315
78993
130183
102188
128800
140640
144402
133746
66157
136169
88585
82083
78884
66913
142607
62297
116267
92283
108383
142698
53334
139604
144184
89522
142032
68327
111034
58033
72836
90483
111008
91385
115528
66856
76318
63000
61721
86102
89367
91018
126390
135550
106711
118434
117698
108304
98998
82998
147998
83344
149309
53964
111042
112244
114337
134419
76114
147869
107076
78626
66552
133785
112234
52693
73606
116199
72505
137500
64873
147893
56938
87481
146006
82226
133657
84149
123742
137593
55372
64696
54386
83466
135058
133268
84234
119067
143566
134224
`

const masses = input.trim().split('\n').map((s) => parseInt(s));

const calcFuel = (mass) => {
  const fuel = Math.floor(mass / 3) - 2;
  return fuel > 0 ? (fuel + calcFuel(fuel)) : 0;
}
console.log(
  masses.reduce((sum, mass) => sum + calcFuel(mass), 0));