const $home = $(".home"),
  $newPost = $(".newPost"),
  $list = $(".list"),
  $statistics = $(".statistics"),
  $content = $(".content"),
  $newPostContainer = $(".newPostContainer");

const funcMenuList = [$home, $newPost, $list, $statistics];

const domain = "localhost:3000";

$(() => {
  const select = $home.attr("class").split(" ")[0];
  $content.load(`assets/html/${select}.html`, () => {
    $.getScript(`assets/module/${select}.js`);
  });
});
/*아이콘을 클릭하면 모든 아이콘이 검은색(off상태)의 아이콘으로 바꾸고 
  클릭된 아이콘만 다시 붉은색으로 바꿔 on상태를 표시한다.*/

$.fn.clickMenu = function () {
  $(this).on("click", () => {
    funcMenuList.forEach((element) => {
      element.removeClass("funcOn");
    });
    $(this).toggleClass("funcOn");
  });
};
/*아이콘을 클릭하면 해당 페이지의 html과 콜백문으로 스크립트를 불러오는 커스텀 플러그인이다.*/
$.fn.loadPage = function () {
  const select = $(this).attr("class").split(" ")[0];
  $(this).on("click", () => {
    $content.load(`assets/html/${select}.html`);
    $.getScript(`assets/module/${select}.js`);
  });
};

$home.loadPage();
$newPost.loadPage();
$list.loadPage();

$home.clickMenu();
$newPost.clickMenu();
$list.clickMenu();
$statistics.clickMenu();
