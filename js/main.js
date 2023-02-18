let startGameButton = document.querySelector(".control-buttons span"),
  gameContainer = document.querySelector(".game"),
  triesElement = document.querySelector(".tries span"),
  blocks = Array.from(gameContainer.children),
  orderRange = [...Array(blocks.length).keys()],
  duration = 1000;

startGameButton.onclick = function () {
  let yourName = prompt("What's your name");
  if (yourName == null || yourName == "") {
    document.querySelector(".name span").innerHTML = "Unknown";
  } else {
    document.querySelector(".name span").innerHTML = yourName;
  }

  startGameButton.parentElement.remove();
};
shuffle(orderRange);

blocks.forEach((block, i) => {
  block.style.order = orderRange[i];
  block.addEventListener("click", () => {
    flipBlock(block);
  });
});

function shuffle(arr) {
  let cur = arr.length,
    random;
  while (cur > 0) {
    random = Math.floor(Math.random() * cur);
    cur--;
    [arr[cur], arr[random]] = [arr[random], arr[cur]];
  }
  return arr;
}
function flipBlock(selected) {
  selected.classList.add("is-flipped");

  let blocksFlippped = blocks.filter((block) =>
    block.classList.contains("is-flipped")
  );

  if (blocksFlippped.length == 2) {
    stopFlipped();
    checkMatchedBlocks(blocksFlippped[0], blocksFlippped[1]);
  }
}

function stopFlipped() {
  gameContainer.classList.add("no-clicking");

  setTimeout(() => {
    gameContainer.classList.remove("no-clicking");
  }, duration);
}

function checkMatchedBlocks(firstBlock, secondBlock) {
  if (firstBlock.dataset.technology == secondBlock.dataset.technology) {
    firstBlock.classList.remove("is-flipped");
    secondBlock.classList.remove("is-flipped");

    firstBlock.classList.add("has-match");
    secondBlock.classList.add("has-match");
  } else {
    triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;
    setTimeout(() => {
      firstBlock.classList.remove("is-flipped");
      secondBlock.classList.remove("is-flipped");
    }, duration);
  }
}
