console.time("init");

function key(element, props = {}) {
  // when use as function without parameter
  if (
    typeof element === "object" &&
    Object.hasOwnProperty.call(element, "keys")
  ) {
    if (typeof props == "string") {
      props = {};
      props.on = props;
    } else if (typeof props !== "object") props = {};

    props.keys = element;
    element = undefined;
  }
  if (element == undefined) element = window;

  // default value of props.on
  if (props?.on == undefined) props.on = "press";

  // run event listener if we have some keys
  if (props?.keys !== undefined && typeof props.keys == "object") {
    element.addEventListener(`key${props.on}`, (event) => {
      const keys = [],
        find = Object.keys(props.keys).find((key) => {
          let press = [];
          if (key.includes("+")) {
            key = key.split("+");
            key.forEach((item) => {
              item = item.trim();

              if (item == "control" || item == "ctrl")
                press.push(event.ctrlKey);
              else if (item == "shift") press.push(event.shiftKey);
              else if (item == "alt") press.push(event.altKey);
              else {
                press.push(
                  event.key.toLowerCase() == item ||
                    event.code.toLowerCase() == item ||
                    event.keyCode == item
                );
              }
            });
          } else {
            press.push(
              (event.key.toLowerCase() == key || event.code.toLowerCase() == key || event.keyCode == key) &&
                !event.altKey &&
                !event.shiftKey &&
                !event.ctrlKey
            );
          }
          return !press.includes(false);
        });

      if (find !== undefined) keys.push(find);
      props["any"] !== undefined ? "" : keys.push("any");

      keys.forEach((key) => {
        props.keys[key](event);
        message(`key ${event.key} pressed\non event "${key}"`);
      });
    });
  }
}

function message(msg) {
  // colorful console.log
  console.log(`->%c${msg}`, "margin-left:1rem;font-family:helvetica;");
}

// global init
Window.prototype.key = (keys, on) => {
  key(window, { keys, on });
};

// init for document
document.key = (keys, on) => {
  key(document, { keys, on });
};

// init for all of the elements
Element.prototype.key = function (keys, on) {
  key(this, { keys, on });
};

const css = `font-family:helvetica;
            font-size:3rem;
            font-weight:200;
            color:#000300;
            text-shadow: -2px -2px #0BE3E5, 2px 2px #EC1651;`;
console.log("%c🗝key.js initialized successfully 😍", css);

console.timeEnd("init");
