$(function () {
    var DEFAULT_FEATURE_IMAGES = ['/medias/featureimages/0.jpg','/medias/featureimages/1.jpg','/medias/featureimages/2.jpg','/medias/featureimages/3.jpg','/medias/featureimages/4.jpg','/medias/featureimages/5.jpg','/medias/featureimages/6.jpg','/medias/featureimages/7.jpg','/medias/featureimages/8.jpg','/medias/featureimages/9.jpg','/medias/featureimages/10.jpg','/medias/featureimages/11.jpg','/medias/featureimages/12.jpg','/medias/featureimages/13.jpg','/medias/featureimages/14.jpg','/medias/featureimages/15.jpg','/medias/featureimages/16.jpg','/medias/featureimages/17.jpg','/medias/featureimages/18.jpg','/medias/featureimages/19.jpg','/medias/featureimages/20.jpg','/medias/featureimages/21.jpg','/medias/featureimages/22.jpg','/medias/featureimages/23.jpg'];
    var featureImagesPool = Array.isArray(window.MATERY_FEATURE_IMAGES) && window.MATERY_FEATURE_IMAGES.length ? window.MATERY_FEATURE_IMAGES.slice() : DEFAULT_FEATURE_IMAGES.slice();
    function takeFeatureImage() {
        if (!featureImagesPool.length) {
            featureImagesPool = Array.isArray(window.MATERY_FEATURE_IMAGES) && window.MATERY_FEATURE_IMAGES.length ? window.MATERY_FEATURE_IMAGES.slice() : DEFAULT_FEATURE_IMAGES.slice();
        }
        var idx = Math.floor(Math.random() * featureImagesPool.length);
        return featureImagesPool.splice(idx, 1)[0];
    }
    /**
     * 添加文章卡片hover效果.
     */
    let articleCardHover = function () {
        let animateClass = 'animated pulse';
        $('article .article').hover(function () {
            $(this).addClass(animateClass);
        }, function () {
            $(this).removeClass(animateClass);
        });
    };
    articleCardHover();

    /*菜单切换*/
    $('.sidenav').sidenav();

    /* 修复文章卡片 div 的宽度. */
    let fixPostCardWidth = function (srcId, targetId) {
        let srcDiv = $('#' + srcId);
        if (srcDiv.length === 0) {
            return;
        }

        let w = srcDiv.width();
        if (w >= 450) {
            w = w + 21;
        } else if (w >= 350 && w < 450) {
            w = w + 18;
        } else if (w >= 300 && w < 350) {
            w = w + 16;
        } else {
            w = w + 14;
        }
        $('#' + targetId).width(w);
    };

    /**
     * 修复footer部分的位置，使得在内容比较少时，footer也会在底部.
     */
    let fixFooterPosition = function () {
        $('.content').css('min-height', window.innerHeight - 165);
    };

    /**
     * 修复样式.
     */
    let fixStyles = function () {
        fixPostCardWidth('navContainer');
        fixPostCardWidth('artDetail', 'prenext-posts');
        fixFooterPosition();
    };
    fixStyles();

    /*调整屏幕宽度时重新设置文章列的宽度，修复小间距问题*/
    $(window).resize(function () {
        fixStyles();
    });

    /*初始化瀑布流布局*/
    $('#articles').masonry({
        itemSelector: '.article'
    });

    AOS.init({
        easing: 'ease-in-out-sine',
        duration: 700,
        delay: 100
    });

    /*文章内容详情的一些初始化特性*/
    let articleInit = function () {
        $('#articleContent a').attr('target', '_blank');

        $('#articleContent img').each(function () {
            let imgPath = $(this).attr('src');
            $(this).wrap('<div class="img-item" data-src="' + imgPath + '" data-sub-html=".caption"></div>');
            // 图片添加阴影
            $(this).addClass("img-shadow img-margin");
            // 图片添加字幕
            let alt = $(this).attr('alt');
            let title = $(this).attr('title');
            let captionText = "";
            // 如果alt为空，title来替
            if (alt === undefined || alt === "") {
                if (title !== undefined && title !== "") {
                    captionText = title;
                }
            } else {
                captionText = alt;
            }
            // 字幕不空，添加之
            if (captionText !== "") {
                let captionDiv = document.createElement('div');
                captionDiv.className = 'caption';
                let captionEle = document.createElement('b');
                captionEle.className = 'center-caption';
                captionEle.innerText = captionText;
                captionDiv.appendChild(captionEle);
                this.insertAdjacentElement('afterend', captionDiv)
            }
        });
        $('#articleContent, #myGallery').lightGallery({
            selector: '.img-item',
            // 启用字幕
            subHtmlSelectorRelative: true
        });

        // progress bar init
        const progressElement = window.document.querySelector('.progress-bar');
        if (progressElement) {
            new ScrollProgress((x, y) => {
                progressElement.style.width = y * 100 + '%';
            });
        }
    };
    articleInit();

    $('.modal').modal();

    /*回到顶部*/
    $('#backTop').click(function () {
        $('body,html').animate({scrollTop: 0}, 400);
        return false;
    });

    /*监听滚动条位置*/
    let $nav = $('#headNav');
    let $backTop = $('.top-scroll');
    // 当页面处于文章中部的时候刷新页面，因为此时无滚动，所以需要判断位置,给导航加上绿色。
    showOrHideNavBg($(window).scrollTop());
    $(window).scroll(function () {
        /* 回到顶部按钮根据滚动条的位置的显示和隐藏.*/
        let scroll = $(window).scrollTop();
        showOrHideNavBg(scroll);
    });

    function showOrHideNavBg(position) {
        let showPosition = 100;
        if (position < showPosition) {
            $nav.addClass('nav-transparent');
            $backTop.slideUp(300);
        } else {
            $nav.removeClass('nav-transparent');
            $backTop.slideDown(300);
        }
    }

    	
	$(".nav-menu>li").hover(function(){
		$(this).children('ul').stop(true,true).show();
		 $(this).addClass('nav-show').siblings('li').removeClass('nav-show');
		
	},function(){
		$(this).children('ul').stop(true,true).hide();
		$('.nav-item.nav-show').removeClass('nav-show');
	})
	
    $('.m-nav-item>a').on('click',function(){
            if ($(this).next('ul').css('display') == "none") {
                $('.m-nav-item').children('ul').slideUp(300);
                $(this).next('ul').slideDown(100);
                $(this).parent('li').addClass('m-nav-show').siblings('li').removeClass('m-nav-show');
            }else{
                $(this).next('ul').slideUp(100);
                $('.m-nav-item.m-nav-show').removeClass('m-nav-show');
            }
    });

    // 初始化加载 tooltipped.
    $('.tooltipped').tooltip();

    // 动态插入导航：人工智能、推荐工具、隐私政策（桌面与移动端）
    try {
        const desktopNav = $('ul.right.nav-menu');
        if (desktopNav.length && desktopNav.find('a[href="/ai"]').length === 0) {
            const homeLi = desktopNav.find('a[href="/"]').first().closest('li');
            if (homeLi.length) {
                let aiLi = $('<li class="hide-on-med-and-down nav-item">\
                    <a href="/ai" class="waves-effect waves-light">\
                        <i class="fas fa-robot" style="zoom: 0.6;"></i>\
                        <span>人工智能</span>\
                    </a>\
                 </li>');
                let toolsLi = $('<li class="hide-on-med-and-down nav-item">\
                    <a href="/tools" class="waves-effect waves-light">\
                        <i class="fas fa-tools" style="zoom: 0.6;"></i>\
                        <span>推荐工具</span>\
                    </a>\
                 </li>');
                homeLi.after(aiLi);
                aiLi.after(toolsLi);
                // 在右侧末尾补充隐私政策链接（避免打断既有顺序）
                let privacyLi = $('<li class="hide-on-med-and-down nav-item">\
                    <a href="/privacy" class="waves-effect waves-light">\
                        <i class="fas fa-user-shield" style="zoom: 0.6;"></i>\
                        <span>隐私政策</span>\
                    </a>\
                 </li>');
                desktopNav.append(privacyLi);
            }
        }

        const mobileNav = $('ul.menu-list.mobile-menu-list');
        if (mobileNav.length && mobileNav.find('a[href="/ai"]').length === 0) {
            const homeM = mobileNav.find('a[href="/"]').first().closest('li');
            if (homeM.length) {
                let aiM = $('<li class="m-nav-item">\
                    <a href="/ai" class="waves-effect waves-light">\
                        <i class="fa-fw fas fa-robot"></i>人工智能\
                    </a>\
                 </li>');
                let toolsM = $('<li class="m-nav-item">\
                    <a href="/tools" class="waves-effect waves-light">\
                        <i class="fa-fw fas fa-tools"></i>推荐工具\
                    </a>\
                 </li>');
                homeM.after(aiM);
                aiM.after(toolsM);
                // 移动端隐私政策放在菜单末尾
                let privacyM = $('<li class="m-nav-item">\
                    <a href="/privacy" class="waves-effect waves-light">\
                        <i class="fa-fw fas fa-user-shield"></i>隐私政策\
                    </a>\
                 </li>');
                mobileNav.append(privacyM);
            }
        }
    } catch (e) {}

    // 页脚挂接隐私政策链接
    try {
        const footerCopy = $('footer .copy-right');
        if (footerCopy.length && footerCopy.find('a[href="/privacy"]').length === 0) {
            footerCopy.append(' | <a href="/privacy" target="_blank" rel="noopener" class="white-color">隐私政策</a>');
        }
    } catch (e) {}

    // 站点 SEO 与内容质量增强
    try {
        const isPost = $('.post-container').length > 0 || $('#artDetail').length > 0;

        // 1) canonical：避免分页/抓取导致的重复
        (function ensureCanonical() {
            if ($('link[rel="canonical"]').length) return;
            const canonicalHref = window.location.origin + window.location.pathname;
            $('<link rel="canonical">').attr('href', canonicalHref).appendTo('head');
        })();

        // 2) 对聚合页（标签/分类/归档）设置 noindex,follow，降低重复内容（仅作为后备策略，若服务端已渲染则不重复注入）
        (function markThinPages() {
            const hasRobotsMeta = $('meta[name="robots"]').length > 0;
            if (hasRobotsMeta) return;
            const path = window.location.pathname;
            const isThin = /\/tags\b|\/categories\b|\/archives\b/.test(path);
            if (isThin) {
                $('head').append('<meta name="robots" content="noindex,follow">');
            }
        })();

        if (isPost) {
            // 3) 自动生成 meta description（优先取正文首段）
            (function ensureDescription() {
                const hasMeta = $('head meta[name="description"]').length > 0;
                if (hasMeta) return;
                let desc = '';
                const firstP = $('#articleContent p').filter(function () {
                    return $(this).text().trim().length > 0;
                }).first();
                if (firstP.length) {
                    desc = firstP.text().trim().replace(/\s+/g, ' ').slice(0, 160);
                } else {
                    desc = $('.post-title').first().text().trim();
                }
                if (desc) {
                    $('<meta name="description">').attr('content', desc).appendTo('head');
                }
            })();

            // 4) 文章结构化数据（Article JSON-LD）
            (function injectArticleLD() {
                if ($('script[type="application/ld+json"].auto-article-ld').length) return;
                const title = $('.post-title').first().text().trim() || document.title;
                const url = window.location.origin + window.location.pathname;
                const pub = $('.post-date').first().text().replace(/[^0-9\-: ]/g, '').trim();
                const author = ($('.author .title').text().trim() || 'zhangxianda');
                // 封面图
                let image = '';
                const bg = $('.post-cover').attr('style') || '';
                const m = bg.match(/url\(['\"]?([^)'\"]+)/);
                if (m && m[1]) image = m[1];
                // 关键词（来自标签 chip）
                const keywords = $('.article-tag .chip').map(function(){return $(this).text().trim();}).get();

                const ld = {
                    '@context': 'https://schema.org',
                    '@type': 'Article',
                    headline: title,
                    mainEntityOfPage: url,
                    datePublished: pub || undefined,
                    dateModified: pub || undefined,
                    author: { '@type': 'Person', name: author },
                    publisher: { '@type': 'Organization', name: '张显达', logo: { '@type': 'ImageObject', url: '/favicon.png' } },
                    image: image || undefined,
                    keywords: keywords && keywords.length ? keywords.join(',') : undefined
                };
                $('<script>', { type: 'application/ld+json', class: 'auto-article-ld' }).text(JSON.stringify(ld)).appendTo('head');
            })();

            // 5) 自动 TL;DR：从小标题生成要点
            (function injectTLDR() {
                if ($('#articleContent').length === 0) return;
                if ($('.auto-tldr').length) return;
                const heads = $('#articleContent h2, #articleContent h3').map(function(){
                    return $(this).text().trim();
                }).get().filter(Boolean).slice(0, 5);
                if (!heads.length) return;
                const lis = heads.map(t => '<li>' + t + '</li>').join('');
                const box = '<div class="card-panel green lighten-5 auto-tldr" style="margin:16px;">\
                  <span class="grey-text text-darken-2" style="font-weight:600;">TL;DR 要点</span>\
                  <ul style="margin:8px 0 0 18px;">'+ lis +'</ul>\
                </div>';
                const hr = $('hr.clearfix').first();
                if (hr.length) hr.after(box); else $('.card-content.article-card-content').first().prepend(box);
            })();

            // 6) 相关推荐：基于 search.xml 与分类/关键词
            (function injectRelated() {
                if ($('.auto-related').length) return;
                const currentUrl = window.location.pathname.replace(/index\.html?$/, '').replace(/\/$/, '');
                const cate = ($('.post-cate .post-category').first().text() || '').trim();
                const keywords = $('.article-tag .chip').map(function(){return $(this).text().trim().toLowerCase();}).get();
                $.ajax({ url: '/search.xml', dataType: 'xml' }).then(function(xml){
                    const entries = $('entry', xml).map(function(){
                        return {
                            title: $('title', this).text(),
                            url: $('url', this).text(),
                            content: $('content', this).text().toLowerCase()
                        };
                    }).get();
                    // 简单评分：同分类（URL 前缀或路径中包含分类目录名），再根据关键词命中计分
                    let scored = entries.filter(e => e.url && !e.url.includes(currentUrl)).map(e => {
                        let score = 0;
                        if (cate && decodeURIComponent(e.url).includes(encodeURIComponent(cate))) score += 2;
                        keywords.forEach(k => { if (k && e.content.indexOf(k) >= 0) score += 1; });
                        return { e, score };
                    }).filter(x => x.score > 0);
                    scored.sort((a,b) => b.score - a.score);
                    const top = scored.slice(0, 3).map(x => x.e);
                    if (!top.length) return;
                    const cards = top.map(it => {
                        const href = it.url.startsWith('/') ? it.url : ('/' + it.url);
                        const imgSrc = takeFeatureImage();
                        return `<div class="col s12 m6 l4">
                            <div class="card">
                                <a href="${href}">
                                    <div class="card-image">
                                        <img src="${imgSrc}" class="responsive-img" alt="${it.title}">
                                        <span class="card-title">${it.title}</span>
                                    </div>
                                </a>
                            </div>
                        </div>`;
                    }).join('');
                    const container = '<div class="auto-related" style="padding:8px 16px 0 16px;">\
                        <h5><i class="fas fa-link"></i>&nbsp;相关推荐</h5>\
                        <div class="row">' + cards + '</div>\
                    </div>';
                    $('.card-content.article-card-content').append(container);
                });
            })();
        }
    } catch (e) {}

    // 老文章的 2025 更新提示（根据分类给出要点）
    try {
        const isPost = $('.post-container').length > 0 || $('#artDetail').length > 0;
        if (isPost) {
            // 获取分类名（如：前端/后端/数据库/软件工具/软件设计/编程之道）
            const cate = ($('.post-cate .post-category').first().text() || '').trim();

            const tipsMap = {
                '前端': [
                    '关注现代构建：Vite、esbuild、Rollup；包管理：pnpm。',
                    '框架现状：React 18、Vue 3、Svelte；SSR/同构与RSC话题。',
                    '语言与标准：TypeScript 5+、ES2023+、CSS 嵌套与容器查询。',
                    '工程与质量：ESLint/Prettier、Vitest/Playwright、Storybook。'
                ],
                '后端': [
                    'Java 21 LTS、Spring Boot 3（Jakarta 命名空间）、GraalVM 原生镜像。',
                    '轻量栈：Quarkus/Micronaut；服务通信：gRPC/HTTP/2。',
                    '可观测性：OpenTelemetry、分布式追踪、结构化日志。',
                    '容器与编排：Docker Compose v2、Kubernetes、GitOps。'
                ],
                '数据库': [
                    '主流版本更新：PostgreSQL、MySQL、Redis 持续演进；JSON/全文索引增强。',
                    '分析与新趋势：ClickHouse、DuckDB；向量检索与 RAG 场景。',
                    '迁移治理：Flyway/Liquibase；备份恢复与只读副本策略。'
                ],
                '人工智能': [
                    'LLM 能力快速演进：优先走 API/SDK 抽象，避免耦死某一家。',
                    'RAG：数据清洗/切分、向量检索与重排、引用与拒答策略。',
                    '工具与智能体：函数调用、计划与反馈回路、结果验证与审计。',
                    '评测与安全：自动回归、越狱/注入防护、合规与数据治理。'
                ],
                '软件工具': [
                    'CI/CD：GitHub Actions、GitLab CI；自动依赖升级：Renovate/Dependabot。',
                    '开发环境：Dev Containers、direnv、Nix；容器：Docker/Podman。',
                    '质量与安全：CodeQL、SAST/DAST、供应链安全（SBOM）。'
                ],
                '软件设计': [
                    '架构取舍：从过度微服务回归模块化单体（Modular Monolith）。',
                    'DDD/整洁架构/六边形架构；事件驱动与幂等、补偿的稳健性。',
                    '可演进性：可测试性、边界清晰、演进式重构。'
                ],
                '编程之道': [
                    '重视可读性与反馈回路：测试先行、渐进抽象与删除代码的勇气。',
                    '度量而非臆测：基准评测与火焰图剖析辅助优化。'
                ],
                '推荐工具': [
                    'CI/CD：GitHub Actions/GitLab CI；缓存、矩阵与可复用工作流。',
                    '开发环境：Dev Containers、包与版本管理、团队统一配置。',
                    '质量与安全：Lint/格式化/测试、SBOM、供应链安全与扫描。'
                ]
            };

            const generic = [
                '本文写于较早时间，生态与最佳实践已更新。',
                '建议核对所涉库/框架的最新文档与版本。',
                '如用于生产，请结合安全、可观测性与自动化评估。'
            ];

            const tips = tipsMap[cate] || generic;
            const today = new Date();
            const stamp = today.getFullYear() + '-' + String(today.getMonth() + 1).padStart(2, '0');

            let lis = tips.map(t => '<li>' + t + '</li>').join('');
            const updateHtml = '\
                <div class="card-panel orange lighten-5" style="margin: 16px;">\
                  <span class="grey-text text-darken-2" style="font-weight:600;">2025 更新提示</span>\
                  <ul style="margin:8px 0 0 18px;">' + lis + '</ul>\
                  <div class="grey-text" style="margin-top:8px;font-size:0.9rem;">最后审阅于 ' + stamp + '</div>\
                </div>';

            const hr = $('hr.clearfix').first();
            if (hr.length) {
                hr.after(updateHtml);
            } else {
                // 兜底：插入到正文卡片顶部
                $('.card-content.article-card-content').first().prepend(updateHtml);
            }
        }
    } catch (e) {}

    // 作者点评（2025）：按分类自动注入深度改写观点，若页面已有 .insight-2025 则不重复
    try {
        const isPost2 = $('.post-container').length > 0 || $('#artDetail').length > 0;
        if (isPost2 && $('.insight-2025').length === 0) {
            const cate2 = ($('.post-cate .post-category').first().text() || '').trim();
            const insightMap = {
                '前端': {
                    title: '现代前端要点',
                    points: [
                        '用 Vite/Vitest/Playwright 与 TypeScript 5 提升工程质量。',
                        'RSC/SSR 与客户端交互的取舍，关注可观测与性能预算。',
                        '样式现代化：CSS 容器查询、CSS 嵌套，组件可访问性（a11y）。'
                    ]
                },
                '后端': {
                    title: '云原生与可观测',
                    points: [
                        'Spring Boot 3 + Java 21 LTS；AOT 与原生镜像优化冷启动。',
                        'OpenTelemetry 指标/追踪/日志三板斧，结构化日志贯通链路。',
                        '幂等/补偿/重试策略内建，优先稳定性与可回滚。'
                    ]
                },
                '数据库': {
                    title: '数据与向量检索',
                    points: [
                        'PostgreSQL 分区/并行/逻辑复制；读写分离与只读副本。',
                        'pgvector/Milvus 支撑向量检索与 RAG，结合权限过滤。',
                        '治理：慢 SQL、备份恢复（PITR）、只读流量承载。'
                    ]
                },
                '软件工具': {
                    title: '工程工具升级',
                    points: [
                        'CI/CD 缓存与矩阵并行；可复用工作流抽象。',
                        '供应链安全：SBOM、签名与第三方依赖固定版本。',
                        'Dev Containers 统一环境，降低入职与切换成本。'
                    ]
                },
                '软件设计': {
                    title: '架构取舍与演进',
                    points: [
                        '模块化单体与微服务取舍；用 DDD/六边形保持边界清晰。',
                        '契约与回归测试优先，谨慎共享内核与跨服务耦合。',
                        '以可观测性驱动重构与容量规划。'
                    ]
                },
                '编程之道': {
                    title: '质量与反馈回路',
                    points: [
                        '强调可读性与删除的艺术；避免过早优化。',
                        '建立测试金字塔与基准评测，量化改动收益。'
                    ]
                },
                '人工智能': {
                    title: 'AI 工程化',
                    points: [
                        'RAG：数据清洗/切分、检索与重排，引用与拒答策略。',
                        '函数调用/工具路由与验证闭环，防幻觉。',
                        '评测与安全：自动回归、越狱/注入防护、合规治理。'
                    ]
                },
                '推荐工具': {
                    title: '工具选型观',
                    points: [
                        '优先生态成熟与维护活跃；可替代与退出机制明确。',
                        '自动化与规范先行，减少个人化脚本依赖。'
                    ]
                }
            };

            const insight = insightMap[cate2];
            if (insight) {
                const lis2 = insight.points.map(t => '<li>' + t + '</li>').join('');
                const insightHtml = '\
                <div class="card-panel cyan lighten-5 insight-2025" style="margin:16px;">\
                    <h4 style="margin-top:0;"><i class="fas fa-lightbulb"></i>&nbsp;作者点评（2025）</h4>\
                    <h5 style="margin:8px 0 6px 0;">' + insight.title + '</h5>\
                    <ul class="browser-default">' + lis2 + '</ul>\
                </div>';
                const hr2 = $('hr.clearfix').first();
                if (hr2.length) hr2.after(insightHtml); else $('.card-content.article-card-content').first().prepend(insightHtml);
            }
        }
    } catch (e) {}
});
