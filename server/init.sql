/*
 Navicat MySQL Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 50731
 Source Host           : localhost
 Source Database       : nest_blog

 Target Server Type    : MySQL
 Target Server Version : 50731
 File Encoding         : utf-8

 Date: 07/22/2022 16:21:40 PM
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `rs_article`
-- ----------------------------
DROP TABLE IF EXISTS `rs_article`;
CREATE TABLE `rs_article` (
  `id` varchar(36) NOT NULL,
  `category_id` int(11) NOT NULL COMMENT '分类ID',
  `title` varchar(255) NOT NULL COMMENT '标题',
  `description` varchar(255) DEFAULT NULL COMMENT '描述',
  `sort` bigint(20) NOT NULL DEFAULT '0' COMMENT '排序',
  `content` text COMMENT '内容',
  `pass_flag` int(11) NOT NULL DEFAULT '1' COMMENT '是否审核',
  `comment_flag` int(11) NOT NULL DEFAULT '0' COMMENT '是否评论',
  `publish_time` varchar(255) NOT NULL COMMENT '发布时间',
  `author` varchar(255) DEFAULT NULL COMMENT '作者',
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`),
  KEY `FK_8d3c7c03977d30208ddc82b4670` (`category_id`),
  CONSTRAINT `FK_8d3c7c03977d30208ddc82b4670` FOREIGN KEY (`category_id`) REFERENCES `rs_category` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
--  Records of `rs_article`
-- ----------------------------
BEGIN;
INSERT INTO `rs_article` VALUES ('0158baf7-873e-4cfd-9e62-b43f2aa01ee3', '4', '生活情感文摘', '幸福的关键不在与找到一个完美的人，而在找到一个人，然后和他一起努力建立一个完美的关系。感情不需要诺言、期限与条件。它只需要两个人：一个能够信任的人，与一个愿意理解的人', '0', '\n## 幸福\n01、幸福的关键不在与找到一个完美的人，而在找到一个人，然后和他一起努力建立一个完美的关系。感情不需要诺言、期限与条件。它只需要两个人：一个能够信任的人，与一个愿意理解的人。\n\n02、没有一个人一生只谈恋爱不做其他事情，也许就在你转身的时候，她离开了你，这样的事情是无法避免的，每天都在发生。不要相信那些爱情小说，因为我们是生活在现实中，而不是童话里，没有谁会等谁一辈子。\n\n03、爱情从不讲公平，讲得公平，不会是爱情。你可以为别人付出一切，却不能要求别人为你奉献任何；你可以不愿抛弃别人，可当你被抛弃时，却不能责怪爱情的无情。爱情不是强加、占有，爱情其实很温柔。如果你要得到他，就让他自由；如果他回到你身边，他就是你的；如果他不在回头，你就只能为他祝福。\n\n## 爱情\n04、假如这世上不曾有过的“爱”，如今我是不是就不会这么悲伤呢？假如这世上没有过的“爱恋”，如今的我是不是就不会这么心痛？假如不曾遇见你，是不是就没有离别了呢？假如我不曾动过真情，是不是如今的我还是很快乐呢？因为我爱了，所以我心痛了，也许你不在乎了，所以我心冷了…\n\n05、如果有人告诉你，曾经爱过。千万不要因此感动。爱情不该是过去式，而应该是进行时。所有已过去的爱，都是最不值钱的。就算曾经洛阳纸贵，而今却已变做尘埃，有什么意义？所以啊，花言巧语都是空洞，说再好听，人走了就是走了。相爱需要什么回忆呢？相爱就应该在面前。\n\n06、多东西勉强不来的，特别是感情，如果双方之间没有默契的，会连想要一个吻都很艰难，无论你认命也好，不认命也好。不过，世间很多东西经过努力总可以能得到一些相应的改变的，感情也一样，如果你有智慧，而不是让你用怨天怨人怨一切能怨的，怨，怨不出你想要的一切。\n\n07、我们抛不开放不下忘不掉的一个人，一些过往，总是藏在了记忆最深处，却又轻易的因为一句话，一首歌，一个背影而忽然清晰的浮上来，在记忆的湖水中飘起一个透明的泡沫，小小的，只有短暂的光亮，可那是它的一生。\n\n08、为何那么多曾让人羡慕的爱情最后无疾而终，而那些从来就没人在意的爱情，却可以如此简单的相爱，开花结果。其实，一只愿意握紧你的手，一颗把你放进生命里的心，这便够了。\n\n## 工作\n09、我们都不断的在寻找，在努力，希望找到属于自己的那份真实。看着别人的幸福来嘲讽着自己的悲哀，心里一直不平衡着希望伤害过自己的人过的比自己差，没自己过的幸福，但是真的看到的时候，却发现真的像每次写的那样，原来我真的希望他过的比我好比我幸福。\n\n10、你以为自己要的是一个爱人，但最后才会知道，真正想要的，无非是安心。许多事情，原本不复杂，却被越想越复杂。有些感情，原本很单纯，却越谈越麻烦。有人爱你，偶尔对你百依百顺，却很难做到一辈子都珍惜。所以，你最需要做的，不是找到那个人，自己爱自己才是真。幸福不是努力去爱，而是安心的生活。\n\n11、在生命中，总有些人，安然而来，静静守候，不离不弃；也有些人，浓烈如酒，疯狂似醉，却是醒来无处觅，来去都如风，梦过无痕。缘深缘浅，如此这般：无数的相遇，无数的别离，伤感良多，或许不舍，或许期待，或许无奈，终得悟，不如守拙以清心，淡然而浅笑。看花开花落、云卷云舒、缘来缘去。\n\n12、有一种目光，直到分手，才知是眷恋；有一种感觉，直到离别，才明白是心痛；有一种心情，直到难眠，才发现是相思；有一种缘分，直到梦醒，才清楚是永恒。对于明天，谁也没有把握；对于爱情，我们只字不提。所有的心情，都如火柴点亮的天堂，浪漫而心酸；所有的爱情，都如落花的心事，常驻心头。\n\n13、在春末里凝望生活，就会多几分明媚，感情生活有时候只是一种心境，累与不累，取决于心态，也许有许多东西，我们在情感上无法说服自己放下，执着会给自己加上更大的包袱，如果无法说服自己，就尽量简化你的生活，你会发现那些让你苦恼不已的问题，变得不再苦恼了。\n\n14、情感语录大全：所谓相遇和回眸都是缘分，当你爱上了某个背影，贪恋某个眼神，意味着你已心系一段情缘。只是缘深缘浅，任谁都无从把握，聚散无由，我们都要以平常心相待。\n\n15、爱情是从什么地方开始的？是从第一眼开始的吗？是从寂寞开始的吗？是从失意开始的吗？是从嘴巴开始的吗？也许，以上一切都不是真正的开始。爱情是从希望开始的。第一次遇上你，你在我心里燃起了希望的火光。\n', '1', '0', '2022-07-22 15:28:50', 'onfuns', '2022-07-22 15:29:19.623230', '2022-07-22 16:20:59.000000'), ('abad0074-8e58-4641-b1f9-a09ff335342f', '1', 'Minio + uPic 搭建自有图床', 'MinIO 是全球领先的对象存储先锋，目前在全世界有数百万的用户. 在标准硬件上，读/写速度上高达183 GB / 秒 和 171 GB / 秒，对象存储可以充当主存储层。uPic Mac版是一个MacOS上的专业图床软件，方便用户直接上传图片到指定的存储空间，并获取有效的markdown图片地址，除了支持微博、SM.MS、七牛云、腾讯云等图床之外，用户还可以自定义配置。', '0', '以`CentOS`系统为例，参考文档 [Minio中文文档](http://docs.minio.org.cn/docs/)\n\n\n```bash\ncd /opt\nwget https://dl.min.io/server/minio/release/linux-amd64/minio\nchmod +x minio\n```\n\n新建启动脚本`minio.sh` 支持后台启动\n\n``` bash\n# Access Key\nexport MINIO_ROOT_USER= 后台登录账号\n# Secret Key\nexport MINIO_ROOT_PASSWORD= 后台登录密码\n#/home/minio/data  指定minio文件存储位置\n#/home/minio/data/minio.log 指定minio的日志文件\nnohup ./minio server --address \":9000\" --console-address \":9001\"  /home/minio/data > /home/minio/data/minio.log 2>&1 &\n\n```\n\n然后执行`sh minio.sh`，查看是否成功` ps -ef | grep minio`，出现下图则代表成功\n\n![image-20220104200539155](https://image.onfuns.com/blog/image-20220104200539155.png)\n\n然后访问 http://ip:9001 即可进入管理界面。\n\n## 使用uPic上传图片\n\n[下载地址](https://github.com/gee1k/uPic/releases)\n\n偏好配置-> 图床-> 选择 Amazon S3(支持第三方S3协议)，空间名称输入后台新建的buket名称，Access key为设置的后台用户名，Secret key 为密码。\n\n![image-20220104200935808](https://image.onfuns.com/blog/image-20220104200935808.png)\n\n## nginx 配置\n\n访问图片代理即可，具体按需配置。\n\n```nginx\n # minio.example.com;\n   server {\n        listen              80;\n        listen              443 ssl;\n        server_name         minio.example.com;\n        ssl_certificate     /opt/keys/minio.example.com.pem;\n        ssl_certificate_key /opt/keys/minio.example.com.key;\n        ssl_protocols       TLSv1 TLSv1.1 TLSv1.2;\n        ssl_ciphers         HIGH:!aNULL:!MD5;\n\n        location / {\n            proxy_set_header Host $http_host;\n            proxy_pass http://127.0.1:9000;\n        }\n        if ($scheme = http ) {\n            return 301 https://$host$request_uri;\n        }\n   }\n```', '1', '0', '2022-07-22 14:27:59', 'onfuns', '2022-07-22 14:28:40.931309', '2022-07-22 14:31:24.000000'), ('f2daec85-fa0a-4e18-bb2c-b978a3cd9f2a', '1', 'HTML5观察模式Observer', 'HTML5提供了四种特性API用来监听元素、性能等变化，通过这些API可以替代监听scroll、resize事件，减少代码复杂度。', '0', 'HTML5提供了四种特性API用来监听元素、性能等变化，通过这些API可以替代监听scroll、resize事件，减少代码复杂度。\n\n## MutationObserver\n\n- 监视对DOM树所做更改的能力，当监听的dom发生变化时会触发注册的回调函数。\n\n``` js\nconst observer = new MutationObserver(callback);\n```\n\n方法：\n\n- `observe(targetElement,options)`：开始监听\n    \n    options 参数，注意`childList`，`attributes` 或者 `characterData` 三个属性之中，至少有一个必须为 `true`\n    \n    - `attributes` (Boolean) 属性的变动\n    - `childList`  (Boolean)子节点的变动（指新增，删除或者更改）\n    - `characterData`  (Boolean)节点内容或节点文本的变动。\n    - `subtree`  (Boolean)是否将该观察器应用于该节点的所有后代节点\n    - `attributeOldValue`  (Boolean)观察attributes变动时，是否需要记录变动前的属性值\n    - `characterDataOldValue` (Boolean)观察characterData变动时，是否需要记录变动前的值\n    - `attributeFilter` (Array) 需要观察的特定属性（比如[\'class\',\'src\']）\n- `disconnect()`: 取消监听\n- `takeRecords()`：删除队列中未处理的记录并返回为新数组\n\n[在线代码](https://stackblitz.com/edit/react-17x71l)\n\n```jsx\nexport default function () {\n  useEffect(() => {\n    const dom = document.querySelector(\'#title\');\n    const observer = new MutationObserver((mutationRecord) => {\n      mutationRecord.forEach((mutation) => {\n        console.log(mutation.type);\n      });\n    });\n    observer.observe(dom, { childList: true, attributes: true });\n    return () => {\n      observer.disconnect();\n    };\n  }, []);\n\n  const onClick = () => {\n    const dom = document.querySelector(\'#title\');\n    dom.innerHTML = \'Hello World\';\n    dom.setAttribute(\'title\', \'Hello World\');\n  };\n\n  return (\n    <div>\n      <h1 id=\"title\">Hello</h1>\n      <button onClick={onClick}>点击</button>\n    </div>\n  );\n}\n```\n\n## **IntersectionObserver**\n\n如果指定`rootMargin`则会检查其是否符合语法规定，检查阈值以确保全部在0.0到1.0之间，并且阈值列表会按升序排列。如果阈值列表为空，则默认为一个[0.0]的数组。\n\n```jsx\nnew IntersectionObserver(callback[, options]);\n```\n\n- callback 是一个回调函数，里面返回监听目标元素的实时数据组成的数组\n- options\n    - `root` 监听元素的祖先元素，其边界盒将被视作视口，默认为document\n    - `rootMargin` 一个在计算交叉值时添加至root的边界盒中的一组偏移量，写法类似CSS的margin\n    - `threshold` 规定了一个监听目标与边界盒交叉区域的比例值，可以是一个具体的数值或是一组0.0到1.0之间的数组，若指定值为0.0，则意味着监听元素即使与根有1像素交叉，此元素也会被视为可见. 若指定值为1.0，则意味着整个元素都在可见范围内时才算可见\n\n方法：\n\n- `observe(targetElement)`：开始监听元素\n- `disconnect()`: 取消所有元素的监听\n- `unobserve(targetElement)`：取消对某一元素的观察\n- `takeRecords()`：对象数组, 每个对象包含目标元素与根每次的相交信息\n\n实现文章内容小标题进入视图区域后锚点跟随滚动，[在线代码](https://stackblitz.com/edit/react-17x71l)\n\n```jsx\nexport default function () {\n  const [currentHeadingIndex, setCurrentHeadingIndex] = useState(0);\n  useEffect(() => {\n    const headings = document.querySelector(\'.content\').querySelectorAll(\'h2\');\n    const observer = new IntersectionObserver(\n      (entries) => {\n        const io = entries[0];\n        if (io.isIntersecting === true) {\n          const index = Array.prototype.indexOf.call(headings, io.target);\n          setCurrentHeadingIndex(index);\n        }\n      },\n      { threshold: [1] }\n    );\n    headings.forEach((node) => observer.observe(node));\n    return () => {\n      headings.forEach((node) => observer.unobserve(node));\n    };\n  }, []);\n\n  const onClick = (index) => {\n    const headings = document.querySelector(\'.content\').querySelectorAll(\'h2\');\n    setCurrentHeadingIndex(index);\n    headings[index].scrollIntoView();\n  };\n\n  const list = [1, 2, 4, 5, 6, 7, 8];\n\n  return (\n    <div className=\"IntersectionObserver\">\n      <div className=\"content\">\n        {list.map((l) => (\n          <h2 key={l}>{l}</h2>\n        ))}\n      </div>\n      <div className=\"anchor\">\n        {list.map((l, index) => (\n          <a\n            key={l}\n            onClick={() => onClick(index)}\n            className={currentHeadingIndex === index ? \'active\' : null}\n          >\n            {l}\n          </a>\n        ))}\n      </div>\n    </div>\n  );\n}\n```\n\n## **ResizeObserver**\n\n可以监听到元素的内容区域边界框改变，内容区域需要减去内边距padding。\n\n方法：\n\n- `observe(targetElement)`：开始监听元素\n- `unobserve(targetElement)`：取消对某一元素的观察\n- `disconnect()`: 取消所有元素的监听\n\n```jsx\nexport default function () {\n  useEffect(() => {\n    const observer = new ResizeObserver((entries) => {\n      for (let entry of entries) {\n        entry.target.innerHTML = entry.target.style.width;\n      }\n    });\n    const dom = document.querySelector(\'.ResizeObserver\');\n    observer.observe(dom);\n    setTimeout(() => {\n      dom.style.width = \'200px\';\n    }, 5000);\n		return () => {\n      observer.disconnect();\n    };\n  }, []);\n\n  return <div className=\"ResizeObserver\"></div>;\n}\n```\n\n## **PerformanceObserver**\n\n用于监测性能变化，特点是可以在 `Web Worker` 中可用\n\n方法：\n\n- `observe(options)`：开始监听\n    \n    `options`是个单key对象 `{entryTypes:[\'frame,navigation\',\'resource\',\'mark\',\'measure\',\'paint\']}`\n    \n- `takeRecords()`：返回当前存储在性能观察器中的性能条目列表，将其清空\n- `disconnect()`: 取消所有监听\n\n```jsx\nconst observer = new PerformanceObserver((list, obj) => {\n  const entries = list.getEntries();\n  for (const i=0; i < entries.length; i++) {\n    // Process \"mark\" and \"frame\" events\n  }\n});\nobserver.observe({entryTypes: [\"mark\", \"frame\"]});\n```\n\n参考链接：**[PerformanceObserver](https://developer.mozilla.org/zh-CN/docs/Web/API/PerformanceObserver)**', '1', '1', '2022-07-06 15:38:57', 'onfuns', '2022-07-06 15:40:37.939697', '2022-07-22 14:36:46.000000');
COMMIT;

-- ----------------------------
--  Table structure for `rs_article_tag_relation`
-- ----------------------------
DROP TABLE IF EXISTS `rs_article_tag_relation`;
CREATE TABLE `rs_article_tag_relation` (
  `article_id` varchar(36) NOT NULL,
  `tag_id` int(11) NOT NULL,
  PRIMARY KEY (`article_id`,`tag_id`),
  KEY `IDX_8af731bd37da3cf3c0b2da2b50` (`article_id`),
  KEY `IDX_d9b1ce3809fd1f7f87928add40` (`tag_id`),
  CONSTRAINT `FK_8af731bd37da3cf3c0b2da2b509` FOREIGN KEY (`article_id`) REFERENCES `rs_article` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_d9b1ce3809fd1f7f87928add40e` FOREIGN KEY (`tag_id`) REFERENCES `rs_tag` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
--  Records of `rs_article_tag_relation`
-- ----------------------------
BEGIN;
INSERT INTO `rs_article_tag_relation` VALUES ('abad0074-8e58-4641-b1f9-a09ff335342f', '1'), ('f2daec85-fa0a-4e18-bb2c-b978a3cd9f2a', '1'), ('0158baf7-873e-4cfd-9e62-b43f2aa01ee3', '3');
COMMIT;

-- ----------------------------
--  Table structure for `rs_auth`
-- ----------------------------
DROP TABLE IF EXISTS `rs_auth`;
CREATE TABLE `rs_auth` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `code` varchar(255) NOT NULL,
  `type` int(11) NOT NULL COMMENT '1:菜单 2:功能',
  `pid` int(11) NOT NULL DEFAULT '0',
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_851166d3aa5938b4073d57404b` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
--  Records of `rs_auth`
-- ----------------------------
BEGIN;
INSERT INTO `rs_auth` VALUES ('1', '工作台', '/dashboard', '1', '0', '2022-07-11 14:26:34.977903', '2022-07-11 14:26:34.977903'), ('2', '查看', '/common/dashboard::GET', '2', '1', '2022-07-11 14:27:47.536191', '2022-07-22 15:40:01.389324'), ('3', '内容管理', '/portal', '1', '0', '2022-07-11 14:28:18.173408', '2022-07-11 14:28:18.173408'), ('4', '栏目管理', '/portal/category', '1', '3', '2022-07-11 14:28:41.899385', '2022-07-11 14:28:41.899385'), ('5', '文章管理', '/portal/article', '1', '3', '2022-07-11 14:31:15.649997', '2022-07-11 14:31:15.649997'), ('6', '标签管理', '/portal/tag', '1', '3', '2022-07-11 14:31:39.500476', '2022-07-11 14:31:46.000000'), ('7', '评论管理', '/portal/comment', '1', '3', '2022-07-11 14:32:08.668987', '2022-07-11 14:32:08.668987'), ('8', '系统管理', '/setting', '1', '0', '2022-07-11 14:32:28.554600', '2022-07-11 14:32:28.554600'), ('9', '用户管理', '/setting/user', '1', '8', '2022-07-11 14:32:48.432401', '2022-07-11 14:32:48.432401'), ('10', '角色管理', '/setting/role', '1', '8', '2022-07-11 14:33:09.334686', '2022-07-11 14:33:09.334686'), ('11', '查看', '/category::GET', '2', '4', '2022-07-11 14:33:45.659687', '2022-07-22 15:40:14.344778'), ('12', '操作', '/category/:id::POST::PUT::DELETE', '2', '4', '2022-07-11 14:34:07.248702', '2022-07-22 16:01:15.327303'), ('13', '查看', '/article::GET', '2', '5', '2022-07-11 14:34:26.285526', '2022-07-22 15:59:40.351517'), ('14', '操作', '/article/:id::POST::PUT::DELETE', '2', '5', '2022-07-11 14:34:57.919356', '2022-07-22 16:01:10.241594'), ('15', '查看', '/tag::GET', '2', '6', '2022-07-11 14:35:21.192230', '2022-07-22 15:59:43.398307'), ('16', '操作', '/tag/:id::POST::PUT::DELETE', '2', '6', '2022-07-11 14:35:36.168356', '2022-07-22 16:01:07.910875'), ('17', '查看', '/comment::GET', '2', '7', '2022-07-11 14:35:52.464289', '2022-07-22 15:59:52.783272'), ('18', '操作', '/comment/:id::POST::PUT::DELETE', '2', '7', '2022-07-11 14:36:04.568258', '2022-07-22 16:01:02.185057'), ('19', '查看', '/user::GET', '2', '9', '2022-07-11 14:36:21.120571', '2022-07-22 15:59:54.691971'), ('20', '操作', '/user/:id::POST::PUT::DELETE', '2', '9', '2022-07-11 14:36:32.860588', '2022-07-22 16:00:59.591913'), ('21', '查看', '/role::GET', '2', '10', '2022-07-11 14:36:49.923577', '2022-07-22 16:00:00.039237'), ('22', '操作', '/role/:id::POST::PUT::DELETE', '2', '10', '2022-07-11 14:37:06.729012', '2022-07-22 16:00:56.726869'), ('23', '权限管理', '/setting/auth::POST::PUT::DELETE', '2', '8', '2022-07-11 17:57:31.032584', '2022-07-22 16:00:53.642908'), ('24', '查看', '/auth::GET', '2', '23', '2022-07-11 17:58:26.523678', '2022-07-22 16:00:09.418058'), ('25', '操作', '/auth/:id::POST::PUT::DELETE', '2', '23', '2022-07-11 17:59:22.938127', '2022-07-22 16:00:46.141707');
COMMIT;

-- ----------------------------
--  Table structure for `rs_category`
-- ----------------------------
DROP TABLE IF EXISTS `rs_category`;
CREATE TABLE `rs_category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL COMMENT '名称',
  `ename` varchar(255) NOT NULL COMMENT '路由',
  `pid` int(11) NOT NULL DEFAULT '0' COMMENT '父级ID',
  `type` int(11) NOT NULL DEFAULT '1' COMMENT '分类类型',
  `status` int(11) NOT NULL DEFAULT '1' COMMENT '显示状态',
  `sort` int(11) NOT NULL DEFAULT '0' COMMENT '排序',
  `url` varchar(255) DEFAULT NULL COMMENT '外链地址',
  `icon` varchar(255) DEFAULT NULL COMMENT '图标',
  `icon_color` varchar(255) DEFAULT NULL COMMENT '图标颜色',
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_0d4a6e502f70fc7d6295a88c3f` (`ename`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
--  Records of `rs_category`
-- ----------------------------
BEGIN;
INSERT INTO `rs_category` VALUES ('1', '前端博客', '/frontend', '0', '1', '1', '0', null, 'icon-qianduan', '#FD9727', '2022-07-06 15:34:45.139511', '2022-07-22 14:34:05.000000'), ('4', '生活笔记', '/life', '0', '1', '1', '0', null, 'icon-gongzuoshouce', '#2E85ED', '2022-07-22 15:26:31.481274', '2022-07-22 15:26:31.481274');
COMMIT;

-- ----------------------------
--  Table structure for `rs_comment`
-- ----------------------------
DROP TABLE IF EXISTS `rs_comment`;
CREATE TABLE `rs_comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL COMMENT '昵称',
  `content` text NOT NULL COMMENT '留言内容',
  `reply` text COMMENT '回复内容',
  `url` varchar(255) DEFAULT NULL COMMENT '网址',
  `aid` varchar(255) NOT NULL COMMENT '文章ID',
  `status` int(11) NOT NULL DEFAULT '0' COMMENT '0:未审核 1:通过',
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`),
  KEY `FK_564f62c6bdcf9787e651b2d7317` (`aid`),
  CONSTRAINT `FK_564f62c6bdcf9787e651b2d7317` FOREIGN KEY (`aid`) REFERENCES `rs_article` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
--  Records of `rs_comment`
-- ----------------------------
BEGIN;
INSERT INTO `rs_comment` VALUES ('1', '小李子', '交个朋友吧', '好的啊~', 'https://google.com', 'f2daec85-fa0a-4e18-bb2c-b978a3cd9f2a', '1', '2022-07-22 14:48:02.912197', '2022-07-22 14:57:58.929749');
COMMIT;

-- ----------------------------
--  Table structure for `rs_role`
-- ----------------------------
DROP TABLE IF EXISTS `rs_role`;
CREATE TABLE `rs_role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `enable` int(11) NOT NULL DEFAULT '1' COMMENT '0--停用,1--启用',
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_869737ed214b1071d35cce0769` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
--  Records of `rs_role`
-- ----------------------------
BEGIN;
INSERT INTO `rs_role` VALUES ('1', '管理员', null, '1', '2022-07-06 17:52:52.088992', '2022-07-06 17:57:58.000000'), ('2', '演示账户', null, '1', '2022-07-11 15:40:55.946618', '2022-07-11 15:40:55.946618');
COMMIT;

-- ----------------------------
--  Table structure for `rs_role_auth_relation`
-- ----------------------------
DROP TABLE IF EXISTS `rs_role_auth_relation`;
CREATE TABLE `rs_role_auth_relation` (
  `role_id` int(11) NOT NULL,
  `auth_id` int(11) NOT NULL,
  PRIMARY KEY (`role_id`,`auth_id`),
  KEY `IDX_70ca17a40d94159d311e2f4a26` (`role_id`),
  KEY `IDX_758b9dc9ff7ab4b76c3550759a` (`auth_id`),
  CONSTRAINT `FK_70ca17a40d94159d311e2f4a260` FOREIGN KEY (`role_id`) REFERENCES `rs_role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_758b9dc9ff7ab4b76c3550759a3` FOREIGN KEY (`auth_id`) REFERENCES `rs_auth` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
--  Records of `rs_role_auth_relation`
-- ----------------------------
BEGIN;
INSERT INTO `rs_role_auth_relation` VALUES ('1', '1'), ('1', '2'), ('1', '3'), ('1', '4'), ('1', '5'), ('1', '6'), ('1', '7'), ('1', '8'), ('1', '9'), ('1', '10'), ('1', '11'), ('1', '12'), ('1', '13'), ('1', '14'), ('1', '15'), ('1', '16'), ('1', '17'), ('1', '18'), ('1', '19'), ('1', '20'), ('1', '21'), ('1', '22'), ('1', '23'), ('1', '24'), ('1', '25'), ('2', '1'), ('2', '2'), ('2', '3'), ('2', '4'), ('2', '5'), ('2', '6'), ('2', '7'), ('2', '8'), ('2', '9'), ('2', '10'), ('2', '11'), ('2', '13'), ('2', '15'), ('2', '17'), ('2', '19'), ('2', '21'), ('2', '24');
COMMIT;

-- ----------------------------
--  Table structure for `rs_tag`
-- ----------------------------
DROP TABLE IF EXISTS `rs_tag`;
CREATE TABLE `rs_tag` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL COMMENT '名称',
  `description` varchar(255) DEFAULT NULL COMMENT '描述',
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
--  Records of `rs_tag`
-- ----------------------------
BEGIN;
INSERT INTO `rs_tag` VALUES ('1', 'javascript', 'js相关', '2022-07-06 15:38:18.534622', '2022-07-06 15:38:18.534622'), ('2', 'css', 'css相关', '2022-07-06 15:38:26.420110', '2022-07-06 15:38:26.420110'), ('3', '情感', null, '2022-07-22 15:29:27.893666', '2022-07-22 15:29:27.893666'), ('4', '文章', null, '2022-07-22 15:32:40.865416', '2022-07-22 15:33:41.025583');
COMMIT;

-- ----------------------------
--  Table structure for `rs_user`
-- ----------------------------
DROP TABLE IF EXISTS `rs_user`;
CREATE TABLE `rs_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `enable` int(11) NOT NULL DEFAULT '1',
  `last_login_ip` varchar(255) DEFAULT NULL,
  `last_login_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `super` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_5c58ed54fc757bc54c360eeb69` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
--  Records of `rs_user`
-- ----------------------------
BEGIN;
INSERT INTO `rs_user` VALUES ('1', 'admin', 'dc483e80a7a0bd9ef71d8cf973673924', '1', '::ffff:127.0.0.1', '2022-07-22 16:19:21.231000', '2022-07-06 15:34:39.109067', '2022-07-22 16:19:21.000000', '1'), ('2', 'demo', 'dc483e80a7a0bd9ef71d8cf973673924', '1', '::ffff:127.0.0.1', '2022-07-22 15:32:14.792000', '2022-07-11 15:53:37.583584', '2022-07-22 15:32:14.000000', '0');
COMMIT;

-- ----------------------------
--  Table structure for `rs_user_role_relation`
-- ----------------------------
DROP TABLE IF EXISTS `rs_user_role_relation`;
CREATE TABLE `rs_user_role_relation` (
  `user_id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL,
  PRIMARY KEY (`user_id`,`role_id`),
  KEY `IDX_4b526cfd49db5fe6bd703cd5d0` (`user_id`),
  KEY `IDX_681a949ae47bb08f085e601bb1` (`role_id`),
  CONSTRAINT `FK_4b526cfd49db5fe6bd703cd5d0f` FOREIGN KEY (`user_id`) REFERENCES `rs_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_681a949ae47bb08f085e601bb17` FOREIGN KEY (`role_id`) REFERENCES `rs_role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
--  Records of `rs_user_role_relation`
-- ----------------------------
BEGIN;
INSERT INTO `rs_user_role_relation` VALUES ('1', '1'), ('2', '2');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
