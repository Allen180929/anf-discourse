import DiscourseRoute from "discourse/routes/discourse";

export default class AnfDiscourseRoute extends DiscourseRoute {
  activate() {
    console.log("AnfDiscourseRoute activated");
  }

  setupController(controller) {
    super.setupController(...arguments);
    console.log("Controller setup in route");
  }
}
