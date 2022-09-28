const slug = require("slug");

const slugify = (input) => {
  return slug(input);
};

test = slugify("Area 52"); // returns area-52
console.log(test);
