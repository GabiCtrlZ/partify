const {
  REACT_APP_DEVELOPMENT: NODE_ENV,
} = process.env

const LANGS = {
  he: 'he',
  en: 'en',
}

const MAIN_TABS = {
  studentTable: 'studentTable',
  test: 'test',
}

const MARKER = {
  length: 10,
  stroke: 1.7,
}

const GRAPH_RATIOS = {
  width: 0.45,
  height: 0.7,
}

const hexagonSide = 25

const HEXAGON = {
  width: 2 * Math.sqrt((3 * (hexagonSide ** 2)) / 4),
  height: 2 * hexagonSide,
}

const COLORS = [
  '#7cb9e8',
  '#c9ffe5',
  '#eedfcd',
  '#f19bbb',
  '#f9d15b',
  '#cd9575',
  '#7fffd5',
  '#d0ff16',
  '#ff9866',
  '#f5c2c2',
  '#9f8170',
  '#c76875',
  '#a2a2d1',
  '#f0dc82',
  '#a3c1ad',
  '#64a0a0',
  '#42775d',
  '#e66771',
  '#c5cbe1',
  '#917896',
]

export {
  LANGS,
  COLORS,
  NODE_ENV,
  GRAPH_RATIOS,
  MAIN_TABS,
  MARKER,
  HEXAGON,
}
