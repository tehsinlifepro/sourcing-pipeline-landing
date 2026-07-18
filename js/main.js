/* ============================================================
   THE SOURCING PIPELINE ENGINE — interactions
   red thread · scroll motion · i18n · seal stamp
   ============================================================ */
(() => {
'use strict';

const $  = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));

const RM = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const hasGsap = typeof window.gsap !== 'undefined' && typeof window.ScrollTrigger !== 'undefined';
const MOTION = hasGsap && !RM;

/* ============================================================
   I18N
   ============================================================ */
const I18N = {
  'cursor.seal':   { en: '盖章', zh: '盖章' },
  'nav.brand':     { en: 'Sourcing Pipeline Engine', zh: '获客引擎' },
  'nav.engine':    { en: 'The Engine', zh: '引擎' },
  'nav.process':   { en: 'How It Works', zh: '流程' },
  'nav.pricing':   { en: 'Pricing', zh: '价格' },
  'nav.faq':       { en: 'FAQ', zh: '常见问题' },
  'nav.cta':       { en: 'Free Audit', zh: '免费诊断' },
  'nav.ctaLong':   { en: 'Get My Free Audit', zh: '获取我的免费诊断' },

  'hero.eyebrow':  { en: 'For Chinese sourcing agencies · 深圳 / 广州 / 义乌', zh: '专为中国采购代理打造 · 深圳 / 广州 / 义乌' },
  'hero.t1':       { en: 'You met them at the booth.', zh: '你们在展位上相遇。' },
  'hero.t2':       { en: 'LinkedIn is where', zh: '领英，是他们' },
  'hero.t3':       { en: 'they <em>stay.</em>', zh: '<em>留下来的地方。</em>' },
  'hero.sub':      { en: 'Your trade show leads go cold in 72 hours. We turn handshakes into long-term relationships — so Western Amazon sellers remember you, trust you, and reach out first.', zh: '展会线索 72 小时内就会冷却。我们把握手变成长期关系 —— 让欧美亚马逊卖家记住你、信任你、主动来找你。' },
  'hero.gloss':    { en: '展会上的名片 72 小时就凉了。我们把握手变成长期关系 —— 让欧美亚马逊卖家记住你、信任你、主动来找你。', zh: '展会上的名片 72 小时就凉了。我们把握手变成长期关系 —— 让欧美亚马逊卖家记住你、信任你、主动来找你。' },
  'hero.cta1':     { en: 'Get My Free LinkedIn Audit', zh: '获取我的免费领英诊断' },
  'hero.cta2':     { en: 'See how it works', zh: '了解运作方式' },
  'hero.trust1':   { en: 'Trusted by cross-border agencies', zh: '深受跨境机构信赖' },
  'hero.trust2':   { en: '30 qualified conversations guaranteed — or your money back', zh: '30 个合格对话保证 —— 否则全额退款' },
  'hero.cardLabel':{ en: 'Meanwhile, on LinkedIn…', zh: '与此同时，在领英上…' },
  'hero.cardMsg':  { en: 'Hi — saw your profile. Do you source kitchen organizers? Looking for a long-term partner.', zh: '你好 —— 看了你的主页。你们做厨房收纳类目吗？在找长期合作伙伴。' },
  'hero.cardYou':  { en: 'You · 2 min later', zh: '你 · 2 分钟后' },
  'hero.cardReply':{ en: "Yes — that's our main category. 14 factories audited. Here's our catalog…", zh: '是的 —— 这正是我们的主力类目。已验厂 14 家。这是我们的目录…' },
  'hero.cardFoot': { en: 'Conversation started · pipeline stage: warm', zh: '对话已开启 · 管道阶段：升温中' },
  'hero.scroll':   { en: 'Scroll', zh: '下滑' },

  'silence.eyebrow': { en: 'The problem · 问题', zh: '问题 · The Problem' },
  'silence.title':   { en: 'Your current sales motion has a black hole', zh: '你现有的销售动作里，有一个黑洞' },
  'silence.p1': { en: 'You spend ¥200,000 a year on trade shows. You fly your team to Canton Fair and Global Sources. You collect 200 business cards. You send 200 follow-up emails. And then?', zh: '你每年在展会上花 ¥200,000。带着团队飞广交会、环球资源展。收了 200 张名片，发了 200 封跟进邮件。然后呢？' },
  'silence.p2': { en: 'The Western Amazon seller met fifteen sourcing agencies that day. Your email is one of fifteen in their inbox. No relationship. No familiarity. No trust.', zh: '那天，欧美亚马逊卖家见了十五家采购代理。你的邮件只是收件箱里的十五分之一。没有关系，没有熟悉感，没有信任。' },
  'silence.p3': { en: "When they get your name — from a booth, a referral, an Alibaba message — their next move isn't to reply. It's to <strong>search you on LinkedIn</strong>. If they find nothing, you never know they looked. You just never hear back.", zh: '当他们拿到你的名字 —— 来自展位、转介绍，或国际站的消息 —— 他们的下一步不是回复，而是<strong>在领英上搜你</strong>。什么都搜不到，你永远不会知道他们找过。你只是再也没有回音。' },
  'silence.gloss': { en: '你不是输在服务上，而是输在海外买家建立信任的地方 —— 你根本不在场。', zh: '你不是输在服务上，而是输在海外买家建立信任的地方 —— 你根本不在场。' },
  'silence.word':  { en: 'Silence.', zh: '沉寂。' },
  'silence.timer1':{ en: 'This is your trade show lead — right now.', zh: '这就是你的展会线索 —— 此时此刻。' },
  'silence.timer2':{ en: 'Every hour that passes, the handshake fades.', zh: '每过一小时，那次握手就淡一分。' },

  'cost.eyebrow': { en: 'The agitation · 代价', zh: '代价 · The Cost' },
  'cost.title':   { en: 'What this is actually costing you', zh: '这到底在让你损失什么' },
  'cost.lede':    { en: "Every month you don't have a LinkedIn presence, you lose:", zh: '每多一个月没有领英存在感，你就在失去：' },
  'cost.c1t': { en: 'Deals you never knew existed', zh: '你从来不知道存在的订单' },
  'cost.c1b': { en: 'Western sellers vet sourcing partners before reaching out. They check LinkedIn. When they find nothing, they move on — and you never even knew they were looking.', zh: '欧美卖家在开口之前就会考察采购伙伴。他们查领英。什么都找不到，就直接划走 —— 你甚至不知道他们曾经找过。' },
  'cost.c1c': { en: '买家先查领英再开口。查无此人，直接划走。', zh: '买家先查领英再开口。查无此人，直接划走。' },
  'cost.c2t': { en: 'Trade show ROI', zh: '展会 ROI' },
  'cost.c2b': { en: "You spend ¥80,000 on a booth. You collect cards. Then those leads go cold because there's no warm place for them to land — no content, no engagement, no reason to remember you over the other fourteen agencies.", zh: '一个展位 ¥80,000。收了一摞名片。然后线索全部冷却，因为没有温暖的地方承接 —— 没有内容，没有互动，没有理由让他们在当天见过的十五家代理里记住你。' },
  'cost.c2c': { en: '¥80,000 的展位，换来 200 张 72 小时就凉的名片。', zh: '¥80,000 的展位，换来 200 张 72 小时就凉的名片。' },
  'cost.c3t': { en: 'Premium pricing power', zh: '溢价能力' },
  'cost.c3b': { en: "The agency with a strong LinkedIn presence doesn't compete on price — they're the obvious choice before the negotiation starts. Without it, you're a commodity. And commodities compete on price alone.", zh: '领英存在感强的代理不用拼价格 —— 谈判开始前，他们就是显而易见的选项。没有它，你就是大宗商品，而大宗商品只能拼价格。' },
  'cost.c3c': { en: '没有存在感，就只能拼价格。', zh: '没有存在感，就只能拼价格。' },
  'cost.c4t': { en: 'Your best people', zh: '你最好的员工' },
  'cost.c4b': { en: "You hire an Overseas Marketing Manager. They don't know LinkedIn. They don't know Western buyers. They quit in six months. The job posting goes up again. The cycle repeats.", zh: '你招了海外营销经理。他们不懂领英，不懂西方买家。六个月就离职。招聘启事再挂上去。循环往复。' },
  'cost.c4c': { en: '招来的人不懂领英、不懂买家，六个月就走人。', zh: '招来的人不懂领英、不懂买家，六个月就走人。' },

  'engine.eyebrow': { en: 'The solution · 方案', zh: '方案 · The Solution' },
  'engine.title':   { en: 'Meet The Sourcing Pipeline Engine', zh: '认识「获客引擎」' },
  'engine.lede':    { en: 'We build the entire trust layer between your agency and Western Amazon sellers — so they find you, remember you, and reach out first. Not "LinkedIn marketing." A complete pipeline machine. <span class="gloss-inline" lang="zh-CN">不是「领英营销」，是一台完整的获客机器。</span>', zh: '我们为你的机构和欧美亚马逊卖家之间搭建完整的信任层 —— 让他们找到你、记住你、主动开口。不是「领英营销」，是一台完整的获客机器。' },
  'engine.s1t': { en: 'They find you', zh: '他们找到你' },
  'engine.s1b': { en: 'We define your ideal Amazon seller — revenue, category, pain signals — then scrape <strong>400 fresh target profiles every month</strong>. No more guessing who to reach out to.', zh: '我们定义你的理想卖家画像（营收、类目、痛点信号），每月抓取 <strong>400 个新鲜目标档案</strong>。不用再猜该联系谁。' },
  'engine.s2t': { en: 'They trust you', zh: '他们信任你' },
  'engine.s2b': { en: 'We rebuild your company page and key employee profiles — not a corporate brochure, but a <strong>trust engine</strong> that answers every question a Western seller has before reaching out.', zh: '我们重建你的公司主页和核心员工档案 —— 不是企业宣传册，而是一台<strong>信任引擎</strong>，回答西方卖家开口前的每一个疑问。' },
  'engine.s3t': { en: 'They remember you', zh: '他们记住你' },
  'engine.s3b': { en: "<strong>12 posts a month</strong> of industry insight and case narratives, plus <strong>200+ strategic comments</strong> on target sellers' posts — your name appears in their notifications before any pitch lands.", zh: '每月 <strong>12 篇帖子</strong>：行业洞察、案例叙事，把你定位成专家而非供应商。外加目标卖家帖子下的 <strong>200+ 条战略评论</strong> —— 在任何推销之前，你的名字先出现在他们的通知里。' },
  'engine.s4t': { en: 'They reply to you', zh: '他们回复你' },
  'engine.s4b': { en: 'Connection requests, InMails, follow-up sequences — scripted, tested, and sent from your profiles. You get warm conversations. <strong>We handle the machine.</strong>', zh: '好友请求、InMail、跟进序列 —— 有脚本、经过测试、从你的账号发出。你拿到温暖的对话，<strong>机器交给我们。</strong>' },
  'engine.s5t': { en: "You see exactly what's working", zh: '你看得清每一步' },
  'engine.s5b': { en: 'Pipeline dashboard: LinkedIn activity → conversations → proposals → closed. <strong>ROI visible in real time.</strong>', zh: '管道仪表盘：领英动作 → 对话 → 提案 → 成交。<strong>ROI 实时可见。</strong>' },
  'engine.cmpTitle': { en: 'Why this beats hiring in-house', zh: '为什么这胜过自己招人' },
  'engine.r1o': { en: 'Hire a marketing manager', zh: '招一个营销经理' },
  'engine.permo':  { en: '/mo', zh: '/月' },
  'engine.permo2': { en: '/mo', zh: '/月' },
  'engine.permo3': { en: '/mo', zh: '/月' },
  'engine.r1n': { en: 'One person. No LinkedIn expertise. No system. Probably quits in 6 months.', zh: '一个人。不懂领英，没有体系。大概率六个月就离职。' },
  'engine.r2o': { en: 'Local LinkedIn agency', zh: '本地领英代运营' },
  'engine.r2n': { en: 'Generic "we are professional" posts. Zero understanding of Western buyers.', zh: '千篇一律的「我们很专业」帖子。完全不懂西方买家。' },
  'engine.r3o': { en: 'The Sourcing Pipeline Engine', zh: '获客引擎' },
  'engine.r3n': { en: 'ICP strategy + 400 targets/mo + 12 posts + 200 comments + full outreach + dashboard + weekly strategy calls.', zh: '画像策略 + 每月 400 个目标 + 12 篇帖子 + 200 条评论 + 全流程外联 + 管道仪表盘 + 每周策略会。' },

  'process.eyebrow': { en: 'How it works · 流程', zh: '流程 · How It Works' },
  'process.title':   { en: 'Three steps. 30 days to live. 90 days to pipeline.', zh: '三步走。30 天上线。90 天出管道。' },
  'process.w1': { en: 'Week 1', zh: '第 1 周' },
  'process.w2': { en: 'Weeks 2–4', zh: '第 2–4 周' },
  'process.w3': { en: 'Month 2+', zh: '第 2 个月起' },
  'process.s1t': { en: 'We Audit', zh: '先诊断' },
  'process.s1b': { en: 'We mystery-shop your company as a Western seller and show you exactly what they see. No pitch, just the truth. Our last cross-border client went from zero to <strong>14 qualified conversations a month in 90 days</strong>.', zh: '我们以西方卖家的身份「神秘访客」你的公司，让你看到他们眼中的真实画面。不推销，只讲真话。上一家跨境客户 90 天内从零做到<strong>每月 14 个合格对话</strong>。' },
  'process.s2t': { en: 'We Build', zh: '再搭建' },
  'process.s2b': { en: 'ICP strategy defined. Company page rebuilt. 3+ key profiles optimized. 400 target sellers scraped. First 4 posts published. <strong>Your LinkedIn goes from dead to alive in 30 days.</strong>', zh: '画像策略、公司主页重建、3+ 核心档案优化、400 个目标卖家入库、首批 4 篇帖子发布。<strong>30 天内，你的领英从沉寂到活跃。</strong>' },
  'process.s3t': { en: 'The Machine Runs', zh: '机器运转' },
  'process.s3b': { en: 'Content flows weekly. Comments build recognition daily. Outreach converts monthly. You review the dashboard and take the calls. <strong>We run everything else.</strong>', zh: '内容每周更新，评论每天刷存在感，外联每月转化。你看仪表盘、接电话，<strong>其他全部我们跑。</strong>' },
  'process.scarcity': { en: 'We take two clients at a time. Next intake: <strong>August 1st</strong>.', zh: '每期只服务两家客户。下期开放：<strong>8 月 1 日</strong>。' },
  'process.cta': { en: 'Get My Free Audit', zh: '获取我的免费诊断' },

  'qualify.title': { en: 'Who this is for', zh: '这套系统适合谁' },
  'qualify.yesT':  { en: 'This is for you if', zh: '适合你，如果：' },
  'qualify.y1': { en: 'You exhibit at Canton Fair or Global Sources and watch leads go cold afterward', zh: '你参加广交会、环球资源展，然后眼睁睁看着线索冷却' },
  'qualify.y2': { en: "You're on Alibaba but tired of competing on price", zh: '你在国际站上，厌倦了和零价值的对手拼价格' },
  'qualify.y3': { en: 'You know LinkedIn matters but lack the time, team, or know-how', zh: '你知道领英重要，但没时间、没团队、没方法' },
  'qualify.y4': { en: "You've tried hiring a marketing person and it didn't stick", zh: '你试过招营销人，但没留住' },
  'qualify.y5': { en: 'One new retained seller client (¥20,000–35,000/mo) would move the needle', zh: '一个新的长期卖家客户（¥20,000–35,000/月）对你意义重大' },
  'qualify.noT': { en: 'This is NOT for you if', zh: '不适合你，如果：' },
  'qualify.n1': { en: "You won't invest 90 days in a system that compounds", zh: '你不愿意给一个复利系统 90 天' },
  'qualify.n2': { en: "You don't believe Western sellers research partners before signing", zh: '你不相信西方卖家签约前会做背景调查' },
  'qualify.n3': { en: 'You want instant orders with zero effort on your side', zh: '你想要零努力的即时订单' },
  'qualify.n4': { en: 'You already have LinkedIn generating consistent inbound leads', zh: '你的领英已经在稳定产生主动询盘' },

  'proof.eyebrow': { en: 'Social proof · 结果', zh: '结果 · Results' },
  'proof.title':   { en: 'Results from cross-border agencies like yours', zh: '和你一样的跨境机构，拿到的结果' },
  'proof.s1':  { en: 'qualified Western conversations / month — up from zero', zh: '每月合格的西方客户对话数 —— 从零起步' },
  'proof.s1c': { en: '每月 14 个合格的西方客户对话', zh: '每月 14 个合格的西方客户对话' },
  'proof.s2':  { en: 'retained clients sourced directly from LinkedIn', zh: '直接来自领英的长期签约客户' },
  'proof.s2c': { en: '平均 2.3 个长期签约客户', zh: '平均 2.3 个长期签约客户' },
  'proof.s3':  { en: 'days from zero presence to a live pipeline', zh: '从零存在感，到跑通的管道（天）' },
  'proof.s3c': { en: '90 天从零到稳定获客', zh: '90 天从零到稳定获客' },

  'pricing.eyebrow': { en: 'Pricing · 价格', zh: '价格 · Pricing' },
  'pricing.title':   { en: 'Choose your level', zh: '选择你的层级' },
  'pricing.pop':     { en: '最受欢迎', zh: '最受欢迎' },
  'pricing.permo':   { en: '/mo', zh: '/月' },
  'pricing.permo2':  { en: '/mo', zh: '/月' },
  'pricing.permo3':  { en: '/mo', zh: '/月' },
  'pricing.usd1': { en: '~$3,100', zh: '约 $3,100' },
  'pricing.usd2': { en: '~$2,100', zh: '约 $2,100' },
  'pricing.usd3': { en: '~$830', zh: '约 $830' },
  'pricing.t1tag': { en: 'Full machine. We run everything — you take the calls.', zh: '完整机器。我们全跑 —— 你只负责接电话。' },
  'pricing.t1l1': { en: 'ICP strategy + profile optimization', zh: '画像策略 + 档案优化' },
  'pricing.t1l2': { en: '400 fresh seller targets / month', zh: '每月 400 个新鲜卖家目标' },
  'pricing.t1l3': { en: '12 posts + 200 strategic comments', zh: '12 篇帖子 + 200 条战略评论' },
  'pricing.t1l4': { en: 'Full outreach execution (requests, InMails, follow-ups)', zh: '全流程外联（好友请求、InMail、跟进）' },
  'pricing.t1l5': { en: 'Pipeline dashboard + weekly strategy reviews', zh: '管道仪表盘 + 每周策略复盘' },
  'pricing.t1l6': { en: 'Trade show → LinkedIn integration', zh: '展会 → 领英联动' },
  'pricing.t1l7': { en: 'The 30-Conversation Guarantee', zh: '30 对话保证' },
  'pricing.cta1': { en: 'Choose Engine', zh: '选择 Engine' },
  'pricing.t2tag': { en: 'Done-For-You. We build. You approve. You handle outreach.', zh: '我们搭建，你审批，外联你自己跑。' },
  'pricing.t2l1': { en: 'Everything in Engine minus outreach execution', zh: 'Engine 的全部内容，除外联执行' },
  'pricing.t2l2': { en: 'Outreach playbooks (scripts, templates, sequences)', zh: '外联 playbook（脚本、模板、序列）' },
  'pricing.t2l3': { en: 'Bi-weekly strategy calls', zh: '双周策略会' },
  'pricing.cta2': { en: 'Choose DFY', zh: '选择 DFY' },
  'pricing.t3tag': { en: 'Done-With-You. We give you the system. You execute.', zh: '我们给系统，你自己执行。' },
  'pricing.t3l1': { en: 'Monthly content calendar + outlines', zh: '每月内容日历 + 大纲' },
  'pricing.t3l2': { en: '200 fresh targets / month', zh: '每月 200 个新鲜目标' },
  'pricing.t3l3': { en: 'Outreach playbooks', zh: '外联 playbook' },
  'pricing.t3l4': { en: 'Monthly strategy call', zh: '每月策略会' },
  'pricing.cta3': { en: 'Choose DWY', zh: '选择 DWY' },
  'pricing.setup': { en: 'One-time setup: ¥8,400 — ICP strategy (¥3,000) + company page rebuild (¥3,000) + 3 profile optimizations (¥2,400)', zh: '一次性启动费：¥8,400 —— 画像策略（¥3,000）+ 公司主页重建（¥3,000）+ 3 份档案优化（¥2,400）' },

  'guarantee.eyebrow': { en: 'The guarantee · 保证', zh: '保证 · The Guarantee' },
  'guarantee.title':   { en: 'The 30-Conversation Guarantee', zh: '30 对话保证' },
  'guarantee.p1': { en: 'Within 90 days of launch, we guarantee 30 qualified seller conversations — Western Amazon sellers who reply with genuine interest.', zh: '上线 90 天内，我们保证 30 个合格卖家对话 —— 真正有兴趣回复的欧美亚马逊卖家。' },
  'guarantee.p2': { en: "If we miss: Month 4 is free. If you're still not at 30 by Month 6: full refund.", zh: '做不到：第 4 个月免费。第 6 个月仍不到 30：全额退款。' },
  'guarantee.p3': { en: "You don't pay for hope. You pay for pipeline activity you can see, track, and measure.", zh: '你不用为「希望」付费。你只为看得见、可追踪、可衡量的管道活动付费。' },
  'guarantee.gloss': { en: '90 天内保证 30 个合格卖家对话 —— 做不到，第 4 个月免费；第 6 个月仍不达标，全额退款。', zh: '90 天内保证 30 个合格卖家对话 —— 做不到，第 4 个月免费；第 6 个月仍不达标，全额退款。' },
  'guarantee.hint': { en: 'Click the seal to re-stamp · 点击印章', zh: '点击印章，重新盖章 · Click the seal' },

  'faq.title': { en: 'Frequently asked questions', zh: '常见问题' },
  'faq.q1': { en: 'We already spend enough on trade shows. Why add another cost?', zh: '展会已经花得够多了，为什么还要加一笔？' },
  'faq.a1': { en: 'Your trade show leads are going cold. Without LinkedIn, the business cards you collect turn into nothing. The Engine makes your existing trade show spend convert — by keeping relationships warm between the booth and the contract.', zh: '你的展会线索正在冷却。没有领英，收回来的名片等于零。获客引擎让你现有的展会投入产生转化 —— 在展位和合同之间，让关系保持温度。' },
  'faq.q2': { en: "Our English isn't great. Can we still do this?", zh: '我们英语不太好，能做吗？' },
  'faq.a2': { en: "We write all content in native English. You review and approve. Your team doesn't need perfect English — we handle the writing.", zh: '所有内容都是母语级英语撰写。你只管审核批准。团队不需要完美英语 —— 写作我们全包。' },
  'faq.q3': { en: 'How fast until we see results?', zh: '多久能看到效果？' },
  'faq.a3': { en: 'Company page and profiles live within 30 days. First outreach goes out in Week 3. Profile views and engagement in month one. Qualified conversations typically flow by Month 2–3.', zh: '公司主页和档案 30 天内上线。第 3 周发出首批外联。第一个月就能看到主页访问和互动。合格对话一般在第 2–3 个月开始流入。' },
  'faq.q4': { en: "What if my team won't post on LinkedIn?", zh: '团队不愿意发领英怎么办？' },
  'faq.a4': { en: 'Most won\'t — at first. We include the Internal Buy-In Kit: incentive structures, pre-written starter posts, and answers for "I don\'t have time for this." In the Engine tier, we handle posting and outreach so your team barely touches it.', zh: '大多数一开始都不愿意。我们提供「内部共识工具包」：激励机制、为每位成员预写的起步帖子、以及「我没时间」的应对话术。Engine 档里，发帖和外联都由我们代劳，团队几乎不用碰。' },
  'faq.q5': { en: "We're a small agency. Is this only for big companies?", zh: '我们是小机构，这是不是只适合大公司？' },
  'faq.a5': { en: 'If one new Amazon seller client is worth ¥20,000–35,000/month to you, the Engine pays for itself with one client. The math works for agencies of any size.', zh: '如果一个新的亚马逊卖家客户对你值 ¥20,000–35,000/月，Engine 一个客户就回本。这个数学对任何规模的机构都成立。' },
  'faq.q6': { en: "What's different about you vs. other LinkedIn agencies?", zh: '你和其他领英代运营有什么不同？' },
  'faq.a6': { en: "Three things. One: we've actually done this for cross-border agencies before. Two: we don't just post content — we build the full machine from ICP targeting to outreach execution. Three: we guarantee results.", zh: '三点。一：我们真的为跨境机构做成过。二：我们不只发内容 —— 从画像定位到外联执行，建的是完整机器。三：我们保证结果。' },
  'faq.q7': { en: "We're not on LinkedIn at all. Is that a problem?", zh: '我们完全没上领英，有问题吗？' },
  'faq.a7': { en: "That's exactly why we exist. Most of our clients start with nothing. We build from zero.", zh: '这正是我们存在的意义。大多数客户从零开始。我们从零搭建。' },

  'final.eyebrow': { en: 'Two spots open · 仅剩两席', zh: '仅剩两席 · Two spots open' },
  'final.t1': { en: 'Get your free', zh: '获取你的免费' },
  'final.t2': { en: 'LinkedIn <em>audit.</em>', zh: '领英<em>诊断。</em>' },
  'final.sub': { en: "We run a boutique operation — two clients maximum. This isn't fake scarcity. It's how every client gets our full attention. We'll mystery-shop your company as a Western seller and show you exactly what they see. If you don't like what we find, we'll show you how to fix it — whether you work with us or not.", zh: '我们做的是精品小所 —— 最多同时服务两家客户。这不是假稀缺，而是让每家客户都得到全部精力。我们会以西方卖家的身份「神秘访客」你的公司，让你看到他们眼中的你。如果你不喜欢看到的画面，我们会告诉你怎么改 —— 无论你最后是否与我们合作。' },
  'final.gloss': { en: '每月只服务两家客户。8 月 1 日开放新名额。先拿免费诊断，看看西方卖家眼中的你。', zh: '每月只服务两家客户。8 月 1 日开放新名额。先拿免费诊断，看看西方卖家眼中的你。' },
  'final.cta': { en: 'Get My Free LinkedIn Audit', zh: '获取我的免费领英诊断' },
  'final.micro': { en: 'The 30-Conversation Guarantee: 30 qualified conversations in 90 days, or Month 4 is free. Still not at 30 by Month 6 — full refund.', zh: '30 对话保证：90 天内 30 个合格对话，否则第 4 个月免费；第 6 个月仍不达标，全额退款。' },

  'footer.brand': { en: 'The Sourcing Pipeline Engine', zh: '获客引擎 · The Sourcing Pipeline Engine' },
  'footer.note': { en: 'Built for Chinese sourcing agencies selling to Western Amazon sellers · 深圳 · 广州 · 义乌', zh: '为服务欧美亚马逊卖家的中国采购代理机构而生 · 深圳 · 广州 · 义乌' }
};

/* A/B variant: ?v=b swaps the hero angle */
const params = new URLSearchParams(location.search);
if (params.get('v') === 'b') {
  I18N['hero.t1'].en = 'Your trade show leads are going cold.';
  I18N['hero.t2'].en = "Here's why they never";
  I18N['hero.t3'].en = 'come <em>back.</em>';
  I18N['hero.cta1'].en = 'See What Western Sellers See';
  I18N['hero.t1'].zh = '你的展会线索正在冷却。';
  I18N['hero.t2'].zh = '这就是为什么他们';
  I18N['hero.t3'].zh = '再也<em>没有回来。</em>';
  I18N['hero.cta1'].zh = '看看西方卖家眼中的你';
}

const TITLE = {
  en: 'The Sourcing Pipeline Engine — LinkedIn Pipeline for Chinese Sourcing Agencies',
  zh: '获客引擎 —— 中国采购代理的领英获客系统'
};

let lang = 'en';
function applyLang(l) {
  lang = l === 'zh' ? 'zh' : 'en';
  document.documentElement.dataset.lang = lang;
  document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
  document.title = TITLE[lang];
  $$('[data-i18n]').forEach(el => {
    const entry = I18N[el.dataset.i18n];
    if (entry && entry[lang] != null) el.innerHTML = entry[lang];
  });
  $$('.lang-toggle__opt').forEach(o => o.classList.toggle('is-on', o.dataset.langOpt === lang));
  try { localStorage.setItem('spe-lang', lang); } catch (e) { /* private mode */ }
}

(function initLang() {
  const url = params.get('lang');
  let stored = null;
  try { stored = localStorage.getItem('spe-lang'); } catch (e) { /* ignore */ }
  applyLang(url === 'zh' || url === 'en' ? url : (stored || 'en'));
})();
$('#langToggle').addEventListener('click', () => applyLang(lang === 'en' ? 'zh' : 'en'));

/* ============================================================
   NAV — scrolled state, burger overlay, anchor scrolling
   ============================================================ */
const nav = $('#nav');
const onScrollNav = () => nav.classList.toggle('is-scrolled', window.scrollY > 40);
window.addEventListener('scroll', onScrollNav, { passive: true });
onScrollNav();

let lenis = null;
const burger = $('#burger');
const overlay = $('#navOverlay');
let menuOpen = false;

function setMenu(open) {
  menuOpen = open;
  burger.classList.toggle('is-open', open);
  burger.setAttribute('aria-expanded', String(open));
  overlay.classList.toggle('is-open', open);
  overlay.setAttribute('aria-hidden', String(!open));
  if (MOTION && open) {
    gsap.fromTo('.nav-overlay__links a',
      { y: 44, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: .8, ease: 'power3.out', stagger: .07, delay: .1, overwrite: true });
  }
  if (lenis) open ? lenis.stop() : lenis.start();
}
burger.addEventListener('click', () => setMenu(!menuOpen));
window.addEventListener('keydown', e => { if (e.key === 'Escape' && menuOpen) setMenu(false); });

function bindAnchors() {
  $$('[data-nav]').forEach(a => a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if (!href || href.charAt(0) !== '#') return;
    const target = $(href);
    if (!target) return;
    e.preventDefault();
    if (menuOpen) setMenu(false);
    if (lenis) lenis.scrollTo(target, { offset: -96 });
    else target.scrollIntoView({ behavior: RM ? 'auto' : 'smooth', block: 'start' });
  }));
}
bindAnchors();

/* ============================================================
   FAQ — one open at a time
   ============================================================ */
const faqItems = $$('.faq-item');
faqItems.forEach(d => d.addEventListener('toggle', () => {
  if (d.open) faqItems.forEach(o => { if (o !== d) o.open = false; });
}));

/* ============================================================
   DECAY CLOCK — 72:00:00 countdown, loops
   ============================================================ */
(function decayClock() {
  const el = $('#decayClock');
  if (!el) return;
  let t = 72 * 3600;
  const pad = n => String(n).padStart(2, '0');
  setInterval(() => {
    t -= 1;
    if (t < 0) t = 72 * 3600;
    el.textContent = pad(Math.floor(t / 3600)) + ':' + pad(Math.floor((t % 3600) / 60)) + ':' + pad(t % 60);
  }, 1000);
})();

/* ============================================================
   CUSTOM CURSOR — dot + trailing ring, 盖章 on CTAs
   ============================================================ */
(function cursor() {
  if (RM || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  const dot = $('.cursor-dot'), ring = $('.cursor-ring');
  let mx = -100, my = -100, rx = -100, ry = -100;
  window.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; }, { passive: true });
  (function loop() {
    rx += (mx - rx) * 0.16;
    ry += (my - ry) * 0.16;
    dot.style.transform = 'translate(' + mx + 'px,' + my + 'px) translate(-50%,-50%)';
    ring.style.transform = 'translate(' + rx + 'px,' + ry + 'px) translate(-50%,-50%)';
    requestAnimationFrame(loop);
  })();
  $$('[data-cursor="seal"]').forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('is-seal'));
    el.addEventListener('mouseleave', () => ring.classList.remove('is-seal'));
  });
  window.addEventListener('mousedown', () => ring.classList.add('is-down'));
  window.addEventListener('mouseup', () => ring.classList.remove('is-down'));
})();

/* ============================================================
   THE RED THREAD — a single line stitching the whole page
   ============================================================ */
let threadTrigger = null;

function catmullRom(pts) {
  let d = 'M ' + pts[0].x.toFixed(1) + ' ' + pts[0].y.toFixed(1);
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] || p2;
    const c1x = p1.x + (p2.x - p0.x) / 6, c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6, c2y = p2.y - (p3.y - p1.y) / 6;
    d += ' C ' + c1x.toFixed(1) + ' ' + c1y.toFixed(1) + ', ' + c2x.toFixed(1) + ' ' + c2y.toFixed(1) + ', ' + p2.x.toFixed(1) + ' ' + p2.y.toFixed(1);
  }
  return d;
}

function buildThread() {
  const svg = $('#thread'), path = $('#threadPath');
  const w = window.innerWidth;
  const docH = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
  svg.setAttribute('width', w);
  svg.setAttribute('height', docH);
  svg.setAttribute('viewBox', '0 0 ' + w + ' ' + docH);

  const pts = [{ x: w * 0.5, y: -80 }];
  $$('[data-thread-anchor]').forEach(sec => {
    const r = sec.getBoundingClientRect();
    const y = r.top + window.scrollY + Math.min(r.height * 0.16, 240);
    const side = sec.getAttribute('data-thread-anchor');
    const x = side === 'left' ? w * 0.1 : side === 'right' ? w * 0.9 : w * 0.5;
    pts.push({ x, y });
  });
  pts.push({ x: w * 0.5, y: docH + 80 });

  path.setAttribute('d', catmullRom(pts));
  const L = path.getTotalLength();
  path.style.strokeDasharray = String(L);

  if (threadTrigger) { threadTrigger.kill(); threadTrigger = null; }

  if (MOTION && w >= 768) {
    path.style.strokeDashoffset = String(L);
    threadTrigger = ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: self => { path.style.strokeDashoffset = String(L * (1 - self.progress)); }
    });
  } else {
    path.style.strokeDashoffset = '0';
  }
}

/* ============================================================
   COST GALLERY — align track with the wrap column
   ============================================================ */
function alignTrack() {
  const track = $('#costTrack'), head = $('.cost__head h2');
  if (!track || !head) return;
  if (window.innerWidth >= 1024) {
    const left = head.getBoundingClientRect().left;
    track.style.paddingLeft = left + 'px';
    track.style.paddingRight = left + 'px';
  } else {
    track.style.paddingLeft = '';
    track.style.paddingRight = '';
  }
}

/* ============================================================
   MOTION — everything below needs GSAP; page reads fine without
   ============================================================ */
if (MOTION) {
  document.documentElement.classList.add('js');
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ ignoreMobileResize: true });

  /* Lenis smooth scroll, driven by GSAP's ticker */
  if (typeof window.Lenis !== 'undefined') {
    lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(t => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  }

  /* hero + final mask reveals */
  gsap.fromTo('.hero .mask__line',
    { yPercent: 110 }, { yPercent: 0, duration: 1.35, ease: 'power4.out', stagger: .09, delay: .2 });
  gsap.fromTo('.final .mask__line',
    { yPercent: 110 }, {
      yPercent: 0, duration: 1.25, ease: 'power4.out', stagger: .1,
      scrollTrigger: { trigger: '#final', start: 'top 72%', once: true }
    });

  /* generic reveals */
  $$('[data-reveal]').forEach(el => {
    gsap.fromTo(el,
      { y: 44, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 1.1, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 86%', once: true } });
  });

  /* floating booth card (keep its CSS rotation) */
  $$('[data-float]').forEach(el => {
    gsap.to(el, { y: -12, rotation: 1.2, duration: 3.2, ease: 'sine.inOut', yoyo: true, repeat: -1 });
  });

  /* desktop-only behaviours */
  const mm = gsap.matchMedia();

  mm.add('(min-width: 1024px)', () => {
    const track = $('#costTrack');
    const dist = () => Math.max(track.scrollWidth - window.innerWidth, 0);
    const tween = gsap.to(track, {
      x: () => -dist(),
      ease: 'none',
      scrollTrigger: {
        trigger: '#costPin',
        start: 'top 12%',
        end: () => '+=' + dist(),
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true
      }
    });
    return () => { tween.scrollTrigger && tween.scrollTrigger.kill(); tween.kill(); gsap.set(track, { clearProps: 'x' }); };
  });

  mm.add('(min-width: 768px)', () => {
    const cards = $$('.stack-card');
    const tweens = cards.slice(0, -1).map((card, i) => gsap.to(card, {
      scale: 0.95,
      opacity: 0.75,
      transformOrigin: 'center top',
      ease: 'none',
      scrollTrigger: { trigger: cards[i + 1], start: 'top 80%', end: 'top 30%', scrub: true }
    }));
    return () => tweens.forEach(t => { t.scrollTrigger && t.scrollTrigger.kill(); t.kill(); });
  });

  /* stat count-ups */
  $$('[data-count]').forEach(el => {
    const end = parseFloat(el.getAttribute('data-count'));
    const dec = parseInt(el.getAttribute('data-decimals') || '0', 10);
    const obj = { v: 0 };
    gsap.to(obj, {
      v: end, duration: 1.8, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 85%', once: true },
      onUpdate: () => { el.textContent = obj.v.toFixed(dec); }
    });
  });

  /* the seal — stamps on entry, re-stamps on click */
  const seal = $('#seal'), sealSvg = $('#seal svg');
  function stamp() {
    seal.classList.remove('is-stamped');
    void seal.offsetWidth;
    seal.classList.add('is-stamped');
    gsap.fromTo(sealSvg,
      { scale: 2.4, autoAlpha: 0, rotation: 10 },
      { scale: 1, autoAlpha: 1, rotation: -2, duration: .5, ease: 'power4.in',
        onComplete: () => gsap.to(sealSvg, { scale: 1.02, rotation: -2.5, duration: .9, ease: 'elastic.out(1, 0.35)' }) });
  }
  ScrollTrigger.create({ trigger: seal, start: 'top 75%', once: true, onEnter: stamp });
  seal.addEventListener('click', stamp);

  /* thread + refresh once webfonts settle */
  buildThread();
  alignTrack();
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => { buildThread(); alignTrack(); ScrollTrigger.refresh(); });
  }
} else {
  buildThread();
  alignTrack();
}

/* rebuild on resize (debounced) */
let resizeTimer = null;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => { buildThread(); alignTrack(); }, 220);
});

})();
