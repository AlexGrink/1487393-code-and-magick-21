"use strict";

const CLOUD_WIDTH = 420;
const CLOUD_HEIGHT = 270;
const CLOUD_X = 100;
const CLOUD_Y = 10;
const BAR_WIDTH = 40;
const GAP = 10;
const FONT_GAP = 15;
const TEXT_WIDTH = 50;
const barHeight = CLOUD_HEIGHT - 150;

const renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

const getMaxElement = function (arr) {
  let maxElement = arr[0];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(
      ctx,
      CLOUD_X + GAP,
      CLOUD_Y + GAP,
      `rgba(0, 0, 0, 0.7)`
  );
  renderCloud(
      ctx,
      CLOUD_X,
      CLOUD_Y,
      `#fff`
  );
  ctx.fillStyle = `black`;
  ctx.font = `16px PT Mono`;
  ctx.fillText(`Ура вы победили!`, CLOUD_X + FONT_GAP * 2, CLOUD_Y + GAP + FONT_GAP * 2);
  ctx.fillText(`Список результатов`, CLOUD_X + FONT_GAP * 2, CLOUD_Y + GAP + FONT_GAP * 3);


  const maxTime = getMaxElement(times);

  for (let i = 0; i < players.length; i++) {
    let randomColor = Math.floor(Math.random() * 100);
    ctx.fillStyle = `hsl(240,` + randomColor + `%, 50%)`;
    if (players[i] === `Вы`) {
      ctx.fillStyle = `red`;
    }
    ctx.fillText(
        Math.round(times[i]),
        CLOUD_X + FONT_GAP + GAP + (TEXT_WIDTH + BAR_WIDTH) * i,
        (-((barHeight * times[i]) / maxTime)) + CLOUD_HEIGHT - GAP * 3
    );

    ctx.fillText(
        players[i],
        CLOUD_X + GAP + FONT_GAP + (TEXT_WIDTH + BAR_WIDTH) * i,
        CLOUD_HEIGHT - GAP
    );
    ctx.fillRect(
        CLOUD_X + FONT_GAP + GAP + (TEXT_WIDTH + BAR_WIDTH) * i,
        CLOUD_HEIGHT - FONT_GAP - GAP,
        BAR_WIDTH,
        -((barHeight * times[i]) / maxTime)
    );
  }
};
