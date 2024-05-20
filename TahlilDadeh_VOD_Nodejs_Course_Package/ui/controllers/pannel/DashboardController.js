class DashboardController {
  index = (req, res) => {
    return res.render("pannelLayout", {
      pageTitle: "داشبورد",
      template: "pannel/dashboard/index",
    });
  };
}

export default DashboardController;
