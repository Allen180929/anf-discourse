import { tracked } from "@glimmer/tracking";
import Controller from "@ember/controller";
import { action } from "@ember/object";
import I18n from "discourse-i18n";

export default class AnfDiscourseController extends Controller {
  @tracked currentCategoryId = "static-site-generator";
  @tracked currentPeriod = "last-28-days";
  @tracked itemsPerPage = 10;
  @tracked currentCategory = null;
  @tracked currentCategoryName = "";
  @tracked currentRepos = [];
  // 全部类别数据
  categories = [
    { id: "static-site-generator", name: "Static Site Generator" },
    { id: "low-code-development", name: "Low Code Development Tool" },
    { id: "business-intelligence", name: "Business Intelligence" },
    { id: "artificial-intelligence", name: "Artificial Intelligence" },
    { id: "web3", name: "Web3" },
    { id: "computer-science", name: "Computer Science Courses" },
  ];
  // 确保数据结构正确
  repoData = {
    "static-site-generator": [
      {
        rank: 1,
        name: "vercel/next.js",
        description: "The React Framework",
        starIncrease: 978,
        totalStars: 138056,
        growthRate: 2.73,
        growthIsPositive: true,
      },
      {
        rank: 2,
        name: "gohugoio/hugo",
        description: "The world's fastest framework for building websites",
        starIncrease: 729,
        totalStars: 86065,
        growthRate: 5.08,
        growthIsPositive: true,
      },
      {
        rank: 3,
        name: "withastro/astro",
        description: "The web framework for content-driven websites",
        starIncrease: 653,
        totalStars: 49855,
        growthRate: 3.55,
        growthIsPositive: true,
      },
    ],
    "low-code-development": [
      {
        rank: 1,
        name: "appsmithorg/appsmith",
        description: "Low code tool to build admin panels and dashboards",
        starIncrease: 354,
        totalStars: 32845,
        growthRate: 3.42,
        growthIsPositive: true,
      },
      {
        rank: 2,
        name: "nocodb/nocodb",
        description: "Open Source Airtable Alternative",
        starIncrease: 243,
        totalStars: 41236,
        growthRate: 2.87,
        growthIsPositive: true,
      },
    ],
    "artificial-intelligence": [
      {
        rank: 1,
        name: "openai/gpt-4",
        description: "OpenAI's large language model",
        starIncrease: 2456,
        totalStars: 189632,
        growthRate: 8.72,
        growthIsPositive: true,
      },
      {
        rank: 2,
        name: "meta/llama",
        description: "Meta's open-source large language model",
        starIncrease: 1435,
        totalStars: 87543,
        growthRate: 6.19,
        growthIsPositive: true,
      },
    ],
  };
  @tracked _repoDataLoaded = false;

  constructor() {
    super(...arguments);
    this.initData();
  }

  // 初始化数据
  initData() {
    this.updateCurrentData();
    this._repoDataLoaded = true;
  }

  // 更新当前数据
  updateCurrentData() {
    this.currentCategory = this.categories.find(
      (c) => c.id === this.currentCategoryId
    );
    this.currentCategoryName = this.currentCategory?.name || "";
    this.currentRepos = this.repoData[this.currentCategoryId] || [];
  }

  get dataLoaded() {
    return this._repoDataLoaded;
  }

  @action
  selectCategory(categoryId) {
    this.currentCategoryId = categoryId;
    this.updateCurrentData();
  }

  @action
  selectPeriod(period) {
    this.currentPeriod = period;
    // 在实际应用中，这里会重新加载对应时间段的数据
  }

  @action
  formatNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
}
