#!/usr/bin/env node
import genDiff from '../src/index.js'
import { program } from 'commander';

program
.description('Compares two configuration files and shows a difference.')
.version('0.0.1', '-V, --version', 'output the version number')
.option('-f, --format <type>', 'output format')
.arguments('<obj1> <obj2>')
.action((obj1, obj2) => console.log(genDiff(obj1, obj2)))

program.parse();
