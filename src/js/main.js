const $home = $(".home"),
  $newPost = $(".newPost"),
  $list = $(".list"),
  $statistics = $(".statistics"),
  $subPage = $(".subPage");

const funcMenuList = [$home, $newPost, $list, $statistics];

/*아이콘을 클릭하면 모든 아이콘이 검은색(off상태)의 아이콘으로 바꾸고 
  클릭된 아이콘만 다시 붉은색으로 바꿔 on상태를 표시한다.*/

$.fn.clickMenu = function () {
  $(this).on("click", () => {
    const select = $(this).attr("class").split(" ")[0];
    funcMenuList.forEach((element) => {
      element.removeClass("funcOn");
    });
    console.log(select);
    $(`.${select}`).toggleClass("funcOn");
  });
};
/*아이콘을 클릭하면 해당 페이지의 html과 콜백문으로 스크립트를 불러오는 커스텀 플러그인이다.*/
$.fn.loadPage = function () {
  $(this).on("click", () => {
    const select = $(this).attr("class").split(" ")[0];
    $subPage.css({ display: "none" });
    $(`.${select}Content`).css({ display: "flex" });
  });
};

// for (var i = 0; i < $funcIcons.length; i++) {
//   $($funcIcons[i]).loadPage();
//   $($funcIcons[i]).clickMenu();
// }

funcMenuList.forEach((item) => {
  item.loadPage();
  item.clickMenu();
});

export default function init() {
  const select = $home.attr("class").split(" ")[0];
  $subPage.css({ display: "none" });
  $(`.${select}Content`).css({ display: "flex" });
}
