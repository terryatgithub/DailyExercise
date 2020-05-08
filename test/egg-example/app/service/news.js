// app/service/news.js
const Service = require('egg').Service;

class NewsService extends Service {
  async list(page = 1) {
    // read config
    const { serverUrl, pageSize } = this.config.news;

    // use build-in http client to GET hacker-news api
    // const { data: idList } = await this.ctx.curl(`${serverUrl}/topstories.json`, {
    //   data: {
    //     orderBy: '"$key"',
    //     startAt: `"${pageSize * (page - 1)}"`,
    //     endAt: `"${pageSize * page - 1}"`,
    //   },
    //   dataType: 'json',
    // //   timeout: 20000
    // });
    const idList = [
        22941144,
        22940564,
        22936818,
        22938901,
        22941223,
    ]
    // parallel GET detail
    const newsList = await Promise.all(
      Object.keys(idList).map(key => {
        // const url = `${serverUrl}/item/${idList[key]}.json`;
        // return this.ctx.curl(url, { dataType: 'json' });
        return {
            by: "webdva",
            descendants: 231,
            id: 22941144,
            score: 313,
            time: 1587519331,
            title: "Why are Soviet math textbooks so hardcore in comparison to US textbooks? (2017)",
            type: "story",
            url: "https://www.quora.com/Why-are-Soviet-mathematics-physics-textbooks-so-insanely-hardcore-in-comparison-to-US-textbooks/answer/Scott-Miller-307?share=1"
        }
      })
    );
    return newsList//.map(res => res.data);
  }
}

module.exports = NewsService;