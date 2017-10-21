const url = 'http://v3.wufazhuce.com:8000/api/';
const parameter = '?channel=wdj&source=summary&source_id=9245&version=4.0.2&uuid=ffffffff-a90e-706a-63f7-ccf973aae5ee&platform=ios';
// api/essay/detail => 阅读
// api/serialcontent/detail => 连载
// api/question/detail => 问答
// api/music/detail => 音乐
// api/movie/id/story/1/0 => 影视

// 第二页轮播数据
// http://v3.wufazhuce.com:8000/api/banner/list/3?last_id=0&platform=ios&sign=58fab54d7a8161b87ed72c19ba98cb9f&user_id=8321262&uuid=467F5C23-D005-4212-AA40-701000C9578E&version=v4.3.2

// api/onelist => content_type {
//     1:阅读, //无tag是 阅读 ，有tag则是tag.title
//     2:连载,
//     3:问答,
//     4:音乐,
//     5:影视,
//     8:电台
// }
/**
 * 获取 <阅读> 数据
 */
export const essayContent = id => fetch(url + 'essay/' + id + parameter);
/**
 * 获取 <连载> 数据
 */
export const serialContent = id => fetch(url + 'serialcontent/' + id + parameter);
/**
 * 获取 <问答> 数据
 */
export const questionContent = id => fetch(url + 'question/detail/' + id + parameter);
/**
 * 获取 <音乐> 数据
 */
export const musicContent = id => fetch(url + 'music/detail/' + id + parameter);

/**
 * 获取评论数据
 */
export const discussDatas = (id, query) => fetch(url + 'comment/praiseandtime' + query + '/' + id + '/0?');
//请求今天的数据
export function getNowDatas() {
    let url = 'http://v3.wufazhuce.com:8000/api/channel/one/0/0?' + parameter;
    return fetch(url).then(response => {
        return response.json();
    })
}
//请求顶部菜单列表数据
//传入年份,月份
export function getMenuList(years, month) {
    let url = 'http://v3.wufazhuce.com:8000/api/feeds/list/' + years + '-' + month + '?' + parameter;
    return fetch(url).then(response => {
        return response.json();
    })
}
//获取指定日期数据
//传入日期 格式: 2012-12-12
export function getDateDatas(date) {
    let url = 'http://v3.wufazhuce.com:8000/api/channel/one/' + date + '/0?' + parameter;
    return fetch(url).then(response => {
        return response.json();
    })
}


/**
 * 获取首页热门城市
 */

// export const hotcity = () => fetch('/v1/cities', {
//     type: 'hot'
// });