#!/usr/bin/env node

import chalk from 'chalk';
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';

let playerName: string;

const sleep = (ms = 2000) =>
  new Promise((r) => setTimeout(r, ms));

async function welcome() {
  const rainbowTitle = chalkAnimation.rainbow(
    'Who wants To Be A Typescript/Javascript Millionaire? \n'
  );

  await sleep();
  rainbowTitle.stop();

  console.log(`${chalk.bgBlue('HOW TO PLAY')}`);
}

async function askName() {
  const answers = await inquirer.prompt({
    name: 'player_name',
    type: 'input',
    message: 'What is your name?',
    default() {
      return 'player';
    },
  });

  playerName = answers.player_name;
}

async function question1() {
  const answers = await inquirer.prompt({
    name: 'question_1',
    type: 'list',
    message:
      'JavaScript was created in 10 days then released on \n',
    choices: [
      'May 23rd, 1995',
      'Nov 24th, 1995',
      'Dec 4th, 1995',
      'Dec 17th, 1996',
    ],
  });

  return handleAnswers(
    answers.question_1 == 'Dec 4th, 1995'
  );
}

async function handleAnswers(isCorrect: boolean) {
  const spinner = createSpinner(
    'Checking answer...'
  ).start();
  await sleep();

  if (isCorrect) {
    spinner.success({
      text: `Nice work, ${playerName}. That's a legit answer`,
    });
  } else {
    spinner.error({
      text: `Game over, you lose ${playerName}`,
    });
    process.exit(1);
  }
}

function winner() {
  console.clear();
  const msg = `Congrats , ${playerName} !\n $ 1 , 000 , 000`;

  figlet(msg, (err, data) => {
    if (data) {
      console.log(
        gradient.pastel.multiline(data)
      );
    }
  });
}

export async function runApp(options?: {
  skipWelcome?: boolean;
}) {
  try {
    if (!options?.skipWelcome) {
      await welcome();
    }
    await askName();
    await question1();
    winner();
  } catch (error) {
    console.log(`Error: ${error}`);
  }
}
