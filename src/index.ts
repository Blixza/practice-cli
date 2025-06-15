#!/usr/bin/env node

import { Command } from 'commander';
import { runApp } from './game.js';

// Declare the program

const program = new Command();

// Add actions onto that CLI

program
  .argument('<string>', 'string to log')
  .option(
    '-c, --capitalize',
    'Capitalize the message'
  )
  .action(
    (
      message: string,
      opts: {
        capitalize?: boolean;
      }
    ) => {
      if (opts.capitalize) {
        console.log(message.toUpperCase());
      } else {
        console.log(message);
      }
    }
  )
  .description('Say hello');

program
  .command('add <numbers...>')
  .action((numbers: number[]) => {
    const total = numbers.reduce((a, b) => a + b);
    console.log(`Total: ${total}`);
  })
  .description('Add numbers and log the total');

program
  .command('get-max-number <numbers...>')
  .action((numbers: number[]) => {
    const max = Math.max(...numbers);
    console.log(`Max: ${max}`);
  })
  .description('Add numbers and log the total');

program
  .command('play-game')
  .option(
    '-s, --skip-welcome',
    'Skip the welcome animation'
  )
  .description('Run the game')
  .action((options) => {
    runApp({ skipWelcome: options.skipWelcome });
  });

program
  .command('name <string>')
  .action((playerName: string) => {
    if (playerName.length >= 15) {
      playerName = playerName.substring(0, 15);
    }
  })
  .description('Apply the nickname');
// Execute the CLI with the given arguments

program.parse(process.argv);
