import classnames from "classnames";
type Styles = { [key: string]: string };

export const getGlobalClassName = (rootClass: any, options: { [x: string]: any; }) => {
  if (typeof options === "string") {
    return `${rootClass}-${options}`;
  } else {
    const mappedOptions: { [key: string]: any } = {}; // Add type annotation here
    for (let option in options) {
      mappedOptions[`${rootClass}--${option}`] = options[option];
    }

    return classnames({
      [rootClass]: true,
      ...mappedOptions,
    });
  }
};


const getClassNameFactory = (
  rootClass: string | number,
  styles: Styles,
  { baseClass = "" }: { baseClass?: string } = {}
) => (options: string | { [key: string]: any } = {}) => {
  let descendant: any = false;
  let modifiers: any = false;

  if (typeof options === "string") {
    descendant = options;
  } else if (typeof options === "object") {
    modifiers = options;
  }

  if (descendant) {
    return baseClass + (styles[`${rootClass}-${descendant}`] || "");
  } else if (modifiers) {
    const prefixedModifiers: { [key: string]: string } = {};

    for (let modifier in modifiers) {
      if (modifiers.hasOwnProperty(modifier)) {
        prefixedModifiers[styles[`${rootClass}--${modifier}`]] =
          modifiers[modifier];
      }
    }

    const c = styles[rootClass];

    return (
      baseClass +
      (c ? " " + c : "") +
      " " +
      Object.keys(prefixedModifiers).map(
        (key) => `${key} ${prefixedModifiers[key]}`
      )
    );
  } else {
    return baseClass + (styles[rootClass] || "");
  }
};


export default getClassNameFactory;
