import { configure } from "@storybook/react"
import { action } from "@storybook/addon-actions"

// This was generated by storybook:
// automatically import all files ending in *.stories.js
// configure(require.context("../stories", true, /\.stories\.js$/), module)

// This was recommended in the gatsby docs to remove stories from the root
// of the gatsby project directory or move it into src....
// but I want to keep it there
// automatically import all files ending in *.stories.js
configure(require.context("../src", true, /\.stories\.js$/), module)

// Gatsby's Link overrides:
// Gatsby defines a global called ___loader to prevent its method calls from creating console errors you override it here
global.___loader = {
  enqueue: () => {},
  hovering: () => {},
}
// Gatsby internal mocking to prevent unnecessary errors in storybook testing environment
global.__PATH_PREFIX__ = ""
// This is to utilized to override the window.___navigate method Gatsby defines and uses to report what path a Link would be taking us to if it wasn't inside a storybook
window.___navigate = pathname => {
  action("NavigateTo:")(pathname)
}
