const btnsChange = document.querySelectorAll(".btn-change");
const currents = document.querySelectorAll(".current");
const previous = document.querySelectorAll(".previous");

stateBtns = [true, false, false];

window.addEventListener("load", () => {
  for (let i = 0; i < btnsChange.length; i++) {
    const time = "daily";
    changeData(time, currents, previous);
  }
});

btnsChange.forEach((element, i) => {
  element.addEventListener("click", () => {
    const time = element.textContent.toLowerCase();
    removeFocus(positionActive(stateBtns));
    addFocus(i);
    changeData(time.trim(), currents, previous);
  });
});

const changeData = async (time, currents, previous) => {
  const information = await fetch("./../Server/data.json");
  const informationObject = await information.json();

  for (let i = 0; i < informationObject.length; i++) {
    individualInfo = informationObject[i].timeframes[time];
    currents[i].textContent = `${individualInfo.current}hrs`;
    previous[i].textContent = `Last week - ${individualInfo.previous}`;
  }
};

const addFocus = (position) => {
  stateBtns[position] = true;
  btnsChange[position].classList.add("active");
};

const removeFocus = (position) => {
  stateBtns[position] = false;
  btnsChange[position].classList.remove("active");
};

const positionActive = (elements) => {
  return elements.indexOf(true);
};
