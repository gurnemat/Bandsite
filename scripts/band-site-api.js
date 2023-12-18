class BandSiteApi {
  constructor(apikey) {
    this.apikey = apikey;
    this.url = "https://project-1-api.herokuapp.com/";
  }

  // Method to get comments, post comment, get show dates

  async getComments() {
    const url = `${this.url}comments?api_key=${this.apikey}`;
    try {
      const getResponse = await axios.get(url);
      return getResponse.data;
    } catch (err) {
      console.log("THERE IS AN ERROR!!!!");
      console.log(err);
    }
  }
  async postComment(newComment) {
    const url = `${this.url}comments?api_key=${this.apikey}`;
    try {
      const response = await axios.post(url, newComment);
      return response.data;
    } catch (err) {
      console.log("THERE IS AN ERROR!!!!");
      console.log(err);
    }
  }

  async getShowDates() {
    const url = `${this.url}showdates?api_key=${this.apikey}`;
    try {
      const getResponse = await axios.get(url);
      return getResponse.date;
    } catch (err) {
      console.log("THERE IS AN ERROR!!!!");
      console.log(err);
    }
  }
}

export default BandSiteApi;
