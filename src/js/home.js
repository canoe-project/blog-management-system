/*웹이 실행이 되면 서버로 부터 페이지의 홈에 필요로 하는 자원을 요청한다.*/

/*요청할 자원은 "이번 주 동안 가장 인기 있는 글" 그리고 "최근 댓글"이다(최근 댓글은 로딩이 된 이후에도 서버에 추가 된다면 실시간으로 추가 하도록 한다.)
    요청이 완료 된다면 자원으로 [{글의 썸네일 이미지, 글의 제목, 글의 일부 내용, 글의 추천수}]가 올 것이다.
    이 자원은 최대 5개의 배열로 이루워져 있다.*/
const domain = "localhost:3000";

$.when(
  $.post(`http://${domain}/manager/home`, {
    source: "article",
    type: "bestPost",
  }),
  $.post(`http://${domain}/manager/home`, {
    source: "comment",
    type: "recent",
  })
).done((bestPost, recentComments) => {
  bestPost[0].forEach((element) => {
    $(".postList").append(`
          <div class="postContainer" data-id="${element._id}">
          <a href="http://${domain}/read/${element._id}">
            <img class="postImg" src="http://${domain}${element.thumbnail}" alt="">
          </a>
            <div class="postContent">
              <a href="http://${domain}/read/${element._id}">
                <div class="postTitle">${element.title}</div>
              </a>
              <a href="http://${domain}/read/${element._id}">
                <div class="postSubCopy">${element.content}</div>
              </a>
            </div>
          </div>
          `);
  });
  recentComments[0].forEach((element) => {
    $(".commentList>ul").append(`
        <li>
          <div class="commentContentTitle">${element.Author}</div>
          <div class="commentContent">${element.content}</div>
          <div class="elapsedTime">${element.date}</div>
        </li>
        `);
  });
});

$(".nextToggle").on(
  "click",
  _.throttle(() => {
    {
      if ($(".postList").scrollLeft() <= $(".postContainer").width() * 3) {
        indexToggle(
          Math.ceil($(".postList").scrollLeft() / $(".postContainer").width()) +
            1
        );
        $(".postList").animate(
          {
            scrollLeft:
              $(".postList").scrollLeft() + $(".postContainer").width(),
          },
          500
        );
      } else {
        indexToggle(
          Math.ceil($(".postList").scrollLeft() / $(".postContainer").width()) +
            1
        );
        $(".postList").scrollLeft(0);
      }
    }
  }, 500)
);

function indexToggle(index) {
  $(`.postIndex .indexElement:nth-child(${index})`).removeClass("indexOn");
  $(
    `.postIndex .indexElement:nth-child(${index == 5 ? 1 : index + 1})`
  ).addClass("indexOn");
}
