// 单词数据 - 深圳沪教牛津版四年级下册
const VOCABULARY_DATA = [
  { word: "weekend", phonetic: "/ˈwiːkend/", meaning: "周末" },
  { word: "send", phonetic: "/send/", meaning: "发送" },
  { word: "email", phonetic: "/ˈiːmeɪl/", meaning: "电子邮件" },
  { word: "letter", phonetic: "/ˈletə(r)/", meaning: "信" },
  { word: "postcard", phonetic: "/ˈpəʊstkɑːd/", meaning: "明信片" },
  { word: "come", phonetic: "/kʌm/", meaning: "来" },
  { word: "home", phonetic: "/həʊm/", meaning: "家" },
  { word: "from", phonetic: "/frɒm/", meaning: "从" },
  { word: "Australia", phonetic: "/ɒˈstreɪliə/", meaning: "澳大利亚" },
  { word: "UK", phonetic: "/ˌjuːˈkeɪ/", meaning: "英国" },
  { word: "Canada", phonetic: "/ˈkænədə/", meaning: "加拿大" },
  { word: "China", phonetic: "/ˈtʃaɪnə/", meaning: "中国" },
  { word: "country", phonetic: "/ˈkʌntri/", meaning: "国家" },
  { word: "live", phonetic: "/lɪv/", meaning: "居住" },
  { word: "there", phonetic: "/ðeə(r)/", meaning: "那里" },
  { word: "teacher", phonetic: "/ˈtiːtʃə(r)/", meaning: "老师" },
  { word: "doctor", phonetic: "/ˈdɒktə(r)/", meaning: "医生" },
  { word: "nurse", phonetic: "/nɜːs/", meaning: "护士" },
  { word: "driver", phonetic: "/ˈdraɪvə(r)/", meaning: "司机" },
  { word: "farmer", phonetic: "/ˈfɑːmə(r)/", meaning: "农民" },
  { word: "cook", phonetic: "/kʊk/", meaning: "厨师" },
  { word: "worker", phonetic: "/ˈwɜːkə(r)/", meaning: "工人" },
  { word: "businessman", phonetic: "/ˈbɪznəsmæn/", meaning: "商人" },
  { word: "police", phonetic: "/pəˈliːs/", meaning: "警察" },
  { word: "people", phonetic: "/ˈpiːpl/", meaning: "人们" },
  { word: "little", phonetic: "/ˈlɪtl/", meaning: "小的" },
  { word: "cute", phonetic: "/kjuːt/", meaning: "可爱的" },
  { word: "fat", phonetic: "/fæt/", meaning: "胖的" },
  { word: "tall", phonetic: "/tɔːl/", meaning: "高的" },
  { word: "short", phonetic: "/ʃɔːt/", meaning: "矮的；短的" },
  { word: "strong", phonetic: "/strɒŋ/", meaning: "强壮的" },
  { word: "thin", phonetic: "/θɪn/", meaning: "瘦的" },
  { word: "young", phonetic: "/jʌŋ/", meaning: "年轻的" },
  { word: "old", phonetic: "/əʊld/", meaning: "老的" },
  { word: "big", phonetic: "/bɪɡ/", meaning: "大的" },
  { word: "small", phonetic: "/smɔːl/", meaning: "小的" },
  { word: "new", phonetic: "/njuː/", meaning: "新的" },
  { word: "long", phonetic: "/lɒŋ/", meaning: "长的" },
  { word: "happy", phonetic: "/ˈhæpi/", meaning: "开心的" },
  { word: "sad", phonetic: "/sæd/", meaning: "伤心的" },
  { word: "hungry", phonetic: "/ˈhʌŋɡri/", meaning: "饥饿的" },
  { word: "thirsty", phonetic: "/ˈθɜːsti/", meaning: "口渴的" },
  { word: "tired", phonetic: "/ˈtaɪəd/", meaning: "疲倦的" },
  { word: "hot", phonetic: "/hɒt/", meaning: "热的" },
  { word: "cold", phonetic: "/kəʊld/", meaning: "冷的" },
  { word: "warm", phonetic: "/wɔːm/", meaning: "温暖的" },
  { word: "cool", phonetic: "/kuːl/", meaning: "凉爽的" },
  { word: "rainy", phonetic: "/ˈreɪni/", meaning: "下雨的" },
  { word: "sunny", phonetic: "/ˈsʌni/", meaning: "晴朗的" },
  { word: "cloudy", phonetic: "/ˈklaʊdi/", meaning: "多云的" },
  { word: "windy", phonetic: "/ˈwɪndi/", meaning: "有风的" },
  { word: "snowy", phonetic: "/ˈsnəʊi/", meaning: "下雪的" },
  { word: "weather", phonetic: "/ˈweðə(r)/", meaning: "天气" },
  { word: "spring", phonetic: "/sprɪŋ/", meaning: "春天" },
  { word: "summer", phonetic: "/ˈsʌmə(r)/", meaning: "夏天" },
  { word: "autumn", phonetic: "/ˈɔːtəm/", meaning: "秋天" },
  { word: "winter", phonetic: "/ˈwɪntə(r)/", meaning: "冬天" },
  { word: "season", phonetic: "/ˈsiːzn/", meaning: "季节" },
  { word: "clean", phonetic: "/kliːn/", meaning: "干净的" },
  { word: "dirty", phonetic: "/ˈdɜːti/", meaning: "脏的" },
  { word: "open", phonetic: "/ˈəʊpən/", meaning: "打开" },
  { word: "close", phonetic: "/kləʊz/", meaning: "关闭" },
  { word: "light", phonetic: "/laɪt/", meaning: "灯；轻的" },
  { word: "heavy", phonetic: "/ˈhevi/", meaning: "重的" }
];

// 随机词汇库
const VOCABULARY_WORDS = [
  "苹果", "香蕉", "橙子", "葡萄", "西瓜", "草莓", "桃子", "梨子", "樱桃", "芒果",
  "汽车", "火车", "飞机", "轮船", "自行车", "摩托车", "公交车", "地铁", "出租车", "卡车",
  "狗", "猫", "鸟", "鱼", "兔子", "乌龟", "老鼠", "蛇", "老虎", "狮子",
  "学校", "医院", "银行", "超市", "图书馆", "电影院", "餐厅", "酒店", "公园", "火车站",
  "红色", "蓝色", "绿色", "黄色", "白色", "黑色", "紫色", "橙色", "粉色", "棕色",
  "春天", "夏天", "秋天", "冬天", "太阳", "月亮", "星星", "云", "雨", "雪",
  "爸爸", "妈妈", "爷爷", "奶奶", "老师", "同学", "朋友", "医生", "护士", "警察",
  "高兴", "难过", "生气", "害怕", "惊讶", "开心", "伤心", "满意", "失望", "紧张"
];

// 扑克牌数据
const POKER_SUITS = ['♠', '♥', '♣', '♦'];
const POKER_VALUES = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

// 古诗数据 - 深圳四年级下册（每句诗带汉字和拼音对照）
const POEM_DATA = [
  {
    title: "静夜思",
    author: "李白",
    lines: [
      { chars: "床前明月光", pinyin: "chuáng qián míng yuè guāng" },
      { chars: "疑是地上霜", pinyin: "yí shì dì shàng shuāng" },
      { chars: "举头望明月", pinyin: "jǔ tóu wàng míng yuè" },
      { chars: "低头思故乡", pinyin: "dī tóu sī gù xiāng" }
    ]
  },
  {
    title: "春晓",
    author: "孟浩然",
    lines: [
      { chars: "春眠不觉晓", pinyin: "chūn mián bù jué xiǎo" },
      { chars: "处处闻啼鸟", pinyin: "chù chù wén tí niǎo" },
      { chars: "夜来风雨声", pinyin: "yè lái fēng yǔ shēng" },
      { chars: "花落知多少", pinyin: "huā luò zhī duō shǎo" }
    ]
  },
  {
    title: "登鹳雀楼",
    author: "王之涣",
    lines: [
      { chars: "白日依山尽", pinyin: "bái rì yī shān jìn" },
      { chars: "黄河入海流", pinyin: "huáng hé rù hǎi liú" },
      { chars: "欲穷千里目", pinyin: "yù qiān lǐ mù" },
      { chars: "更上一层楼", pinyin: "gèng shàng yī céng lóu" }
    ]
  },
  {
    title: "相思",
    author: "王维",
    lines: [
      { chars: "红豆生南国", pinyin: "hóng dòu shēng nán guó" },
      { chars: "春来发几枝", pinyin: "chūn lái fā jī zhī" },
      { chars: "愿君多采撷", pinyin: "yuàn jūn duō cǎi xié" },
      { chars: "此物最相思", pinyin: "cǐ wù zuì xiāng sī" }
    ]
  },
  {
    title: "鹿柴",
    author: "王维",
    lines: [
      { chars: "空山不见人", pinyin: "kōng shān bù jiàn rén" },
      { chars: "但闻人语响", pinyin: "dàn wén rén yǔ xiǎng" },
      { chars: "返景入深林", pinyin: "fǎn jǐng rù shēn lín" },
      { chars: "复照青苔上", pinyin: "fù zhào qīng tái shàng" }
    ]
  },
  {
    title: "江雪",
    author: "柳宗元",
    lines: [
      { chars: "千山鸟飞绝", pinyin: "qiān shān niǎo fēi jué" },
      { chars: "万径人踪灭", pinyin: "wàn jìng rén zōng miè" },
      { chars: "孤舟蓑笠翁", pinyin: "gū zhōu suō lì wēng" },
      { chars: "独钓寒江雪", pinyin: "dú diào hán jiāng xuě" }
    ]
  },
  {
    title: "游子吟",
    author: "孟郊",
    lines: [
      { chars: "慈母手中线", pinyin: "cí mǔ shǒu zhōng xiàn" },
      { chars: "游子身上衣", pinyin: "yóu zǐ shēn shàng yī" },
      { chars: "临行密密缝", pinyin: "lín xíng mì mì fèng" },
      { chars: "意恐迟迟归", pinyin: "yì kǒng chí chí guī" }
    ]
  },
  {
    title: "早发白帝城",
    author: "李白",
    lines: [
      { chars: "朝辞白帝彩云间", pinyin: "cháo cí bái dǐ cǎi yún jiān" },
      { chars: "千里江陵一日还", pinyin: "qiān lǐ jiāng líng yī rì hái" },
      { chars: "两岸猿声啼不住", pinyin: "liǎng àn yuán shēng tí bù zhù" },
      { chars: "轻舟已过万重山", pinyin: "qīng zhōu yǐ guò wàn chóng shān" }
    ]
  },
  {
    title: "绝句",
    author: "杜甫",
    lines: [
      { chars: "两个黄鹂鸣翠柳", pinyin: "liǎng gè huáng lí míng cuì liǔ" },
      { chars: "一行白鹭上青天", pinyin: "yī háng bái lù shàng qīng tiān" },
      { chars: "窗含西岭千秋雪", pinyin: "chuāng hán xī lǐng qiān qiū xuě" },
      { chars: "门泊东吴万里船", pinyin: "mén bó dōng wú wàn lǐ chuán" }
    ]
  },
  {
    title: "悯农",
    author: "李绅",
    lines: [
      { chars: "锄禾日当午", pinyin: "chú hé rì dāng wǔ" },
      { chars: "汗滴禾下土", pinyin: "hàn dī hé xià tǔ" },
      { chars: "谁知盘中餐", pinyin: "shéi zhī pán zhōng cān" },
      { chars: "粒粒皆辛苦", pinyin: "lì lì jiē xīn kǔ" }
    ]
  },
  {
    title: "清明",
    author: "杜牧",
    lines: [
      { chars: "清明时节雨纷纷", pinyin: "qīng míng shí jié yǔ fēn fēn" },
      { chars: "路上行人欲断魂", pinyin: "lù shàng xíng rén yù duàn hún" },
      { chars: "借问酒家何处有", pinyin: "jiè wèn jiǔ jiā hé chù yǒu" },
      { chars: "牧童遥指杏花村", pinyin: "mù tóng yáo zhǐ xìng huā cūn" }
    ]
  },
  {
    title: "宿新市徐公店",
    author: "杨万里",
    lines: [
      { chars: "篱落疏疏一径深", pinyin: "lí luò shū shū yī jìng shēn" },
      { chars: "树头花落未成阴", pinyin: "shù tóu huā luò wèi chéng yīn" },
      { chars: "儿童急走追黄蝶", pinyin: "ér tóng jì zǒu zhuī huáng dié" },
      { chars: "飞入菜花无处寻", pinyin: "fēi rù cài huā wú chù xún" }
    ]
  },
  {
    title: "所见",
    author: "袁枚",
    lines: [
      { chars: "牧童骑黄牛", pinyin: "mù tóng qí huáng niú" },
      { chars: "歌声振林樾", pinyin: "gē shēng zhèn lín yuè" },
      { chars: "意欲捕鸣蝉", pinyin: "yì yù bǔ míng chán" },
      { chars: "忽然闭口立", pinyin: "hū rán bì kǒu lì" }
    ]
  },
  {
    title: "山行",
    author: "杜牧",
    lines: [
      { chars: "远上寒山石径斜", pinyin: "yuǎn shàng hán shān shí jìng xié" },
      { chars: "白云深处有人家", pinyin: "bái yún shēn chù yǒu rén jiā" },
      { chars: "停车坐爱枫林晚", pinyin: "tíng chē zuò ài fēng lín wǎn" },
      { chars: "霜叶红于二月花", pinyin: "shuāng yè hóng yú èr yuè huā" }
    ]
  },
  {
    title: "赠汪伦",
    author: "李白",
    lines: [
      { chars: "李白乘舟将欲行", pinyin: "lǐ bái chéng zhōu jiāng yù xíng" },
      { chars: "忽闻汪伦踏歌声", pinyin: "hū wén wāng lún tǎ gē shēng" },
      { chars: "桃花潭水深千尺", pinyin: "táo huā tán shuǐ shēn qiān chǐ" },
      { chars: "不及汪伦送我情", pinyin: "bù jí wāng lún sòng wǒ qíng" }
    ]
  },
  {
    title: "回乡偶书",
    author: "贺知章",
    lines: [
      { chars: "少小离家老大回", pinyin: "shào xiǎo lí jiā lǎo dà huí" },
      { chars: "乡音无改鬓毛衰", pinyin: "xiāng yīn wú gǎi bìn máo shuāi" },
      { chars: "儿童相见不相识", pinyin: "ér tóng xiāng jiàn bù xiāng shí" },
      { chars: "笑问客从何处来", pinyin: "xiào wèn kè cóng hé chù lái" }
    ]
  }
];