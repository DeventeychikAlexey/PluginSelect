import { Select } from "./select.js";
import "../styles/normalize.css";
import "../styles/style.scss";
import "../styles/select.scss";

const select = new Select("#select", {
  selected: 2,
  list: [
    { id: 1, title: "angular" },
    { id: 2, title: "react" },
    { id: 3, title: "vue" },
  ],
});
