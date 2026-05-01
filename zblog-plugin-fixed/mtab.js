/* ========================================
   MTAB v1.54 - 修复滚轮阈值问题
   每次修改版本号 +0.01
   ======================================== */

var timeSettings = {
    show: zbp.cookie.get('timeShow') !== '0',
    hour24: zbp.cookie.get('time24h') !== '0',
    seconds: zbp.cookie.get('timeSeconds') !== '0',
    week: zbp.cookie.get('timeWeek') !== '0',
    color: zbp.cookie.get('timeColor') || '#ffffff'
};

var lastTimeStr = '';
var lastDateStr = '';

function initTimeSettings() {
    document.getElementById('timeShow').checked = timeSettings.show;
    document.getElementById('time24h').checked = timeSettings.hour24;
    document.getElementById('timeSeconds').checked = timeSettings.seconds;
    document.getElementById('timeWeek').checked = timeSettings.week;
    setTimeColor(timeSettings.color, false);
}

function updateTimeSettings() {
    timeSettings.show = document.getElementById('timeShow').checked;
    timeSettings.hour24 = document.getElementById('time24h').checked;
    timeSettings.seconds = document.getElementById('timeSeconds').checked;
    timeSettings.week = document.getElementById('timeWeek').checked;
    zbp.cookie.set('timeShow', timeSettings.show ? '1' : '0', 365);
    zbp.cookie.set('time24h', timeSettings.hour24 ? '1' : '0', 365);
    zbp.cookie.set('timeSeconds', timeSettings.seconds ? '1' : '0', 365);
    zbp.cookie.set('timeWeek', timeSettings.week ? '1' : '0', 365);
}

function setTimeColor(color, save = true) {
    timeSettings.color = color;
    document.getElementById('mtab-time').style.color = color;
    document.querySelectorAll('.cc-color').forEach(c => c.classList.remove('active'));
    document.querySelectorAll('.cc-color').forEach(c => {
        if (c.style.background === color || c.style.backgroundColor === color) {
            c.classList.add('active');
        }
    });
    if (save) zbp.cookie.set('timeColor', color, 365);
}

function updateTime() {
    if (!timeSettings.show) {
        document.getElementById('mtab-time').style.display = 'none';
        return;
    }
    document.getElementById('mtab-time').style.display = 'block';
    
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var date = now.getDate();
    var day = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'][now.getDay()];
    var hours = now.getHours();
    var minutes = now.getMinutes();
    var seconds = now.getSeconds();
    
    if (!timeSettings.hour24) {
        var period = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
    }
    
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    
    var timeStr = hours + ':' + minutes;
    if (timeSettings.seconds) timeStr += ':' + seconds;
    if (!timeSettings.hour24) timeStr += ' ' + period;
    
    var dateStr = year + '-' + month + '-' + date;
    if (timeSettings.week) dateStr += ' ' + day;
    
    requestAnimationFrame(function() {
        if (timeStr !== lastTimeStr) {
            var timeEl = document.querySelector('#mtab-time .time-main');
            if (timeEl) {
                timeEl.textContent = timeStr;
            } else {
                document.getElementById('mtab-time').innerHTML = 
                    '<div class="time-main">' + timeStr + '</div>' +
                    '<div class="time-sub">' + dateStr + '</div>';
            }
            lastTimeStr = timeStr;
        }
        
        if (dateStr !== lastDateStr) {
            var dateEl = document.querySelector('#mtab-time .time-sub');
            if (dateEl) {
                dateEl.textContent = dateStr;
            }
            lastDateStr = dateStr;
        }
    });
}

function bindTimeSettings() {
    var toggles = ['timeShow', 'time24h', 'timeSeconds', 'timeWeek'];
    toggles.forEach(function(id) {
        var el = document.getElementById(id);
        if (el && !el.dataset.bound) {
            el.dataset.bound = '1';
            el.addEventListener('change', function() {
                updateTimeSettings();
                updateTime();
            });
        }
    });
    
    document.querySelectorAll('.cc-color').forEach(function(c) {
        if (!c.dataset.bound) {
            c.dataset.bound = '1';
            c.addEventListener('click', function() {
                var color = this.style.background || this.style.backgroundColor;
                setTimeColor(color);
            });
        }
    });
}

console.log('mtab.js 加载成功 v1.54');

// 用全局变量保存原始 txpostajax，防止重复覆盖
if (typeof tx_host !== 'undefined' && typeof window.originalTxpostajax === 'undefined') {
    console.log('tx_host 存在:', tx_host);
    window.originalTxpostajax = txpostajax;
    txpostajax = function(url) {
        console.log('txpostajax 被调用, url:', url);
        
        // 额外处理侧边栏选中状态和当前分类ID
        var cidMatch = url.match(/cid=(\d+)/);
        if (cidMatch) {
            var cid = cidMatch[1];
            console.log('找到 cid:', cid);
            window.current_cid = cid;
            
            var getidEl = document.getElementById('getid');
            if (getidEl) {
                getidEl.value = cid;
            }
            
            // 延时设置侧边栏选中状态，等内容加载完
            setTimeout(function() {
                var sidebarItems = document.querySelectorAll('.sidebar-cate-item');
                sidebarItems.forEach(function(item) {
                    if (!item.classList.contains('sidebar-add-cate')) {
                        item.classList.remove('on');
                        if (item.dataset.id == cid) {
                            item.classList.add('on');
                        }
                    }
                });
                // 重新绑定事件
                bindSidebarCates();
            }, 400);
        }
        
        // 调用原来的函数
        window.originalTxpostajax(url);
    };
}

function applyIconSettings() {
    var size = zbp.cookie.get('iconSize') || 64;
    var radius = zbp.cookie.get('iconRadius');
    var gapX = zbp.cookie.get('iconGapX');
    var gapY = zbp.cookie.get('iconGapY');
    var textColor = zbp.cookie.get('iconTextColor');
    var iconBgColor = zbp.cookie.get('iconBgColor');
    
    if (size) {
        size = Math.max(60, Math.min(80, parseInt(size)));
        document.documentElement.style.setProperty('--icon-size', size + 'px');
        var iconSizeInput = document.getElementById('iconSize');
        if (iconSizeInput) iconSizeInput.value = size;
    }
    
    if (radius) {
        document.documentElement.style.setProperty('--icon-radius', radius + 'px');
    }
    
    if (iconBgColor) {
        document.documentElement.style.setProperty('--icon-bg-color', iconBgColor);
    }
    
    if (gapX) {
        document.documentElement.style.setProperty('--icon-gap-x', gapX + 'px');
    }
    
    if (gapY) {
        document.documentElement.style.setProperty('--icon-gap-y', gapY + 'px');
    }
    
    if (textColor) {
        document.documentElement.style.setProperty('--icon-name-color', textColor);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    var timeEl = document.getElementById('mtab-time');
    if (timeEl) {
        timeEl.innerHTML = '<div class="time-main"></div><div class="time-sub"></div>';
        updateTime();
        setInterval(updateTime, 250);
    }
    bindTimeSettings();
    bindSidebarCates();
    
    var savedTimeColor = zbp.cookie.get('timeColor');
    if (savedTimeColor) {
        var timeColorInput = document.getElementById('timeColor');
        if (timeColorInput) {
            timeColorInput.value = savedTimeColor;
        }
    }
});

function bindSidebarCates() {
    console.log('bindSidebarCates 开始执行');
    
    document.querySelectorAll('.sidebar-cate-item').forEach(function(item, index) {
        if (item.dataset.bound) return;
        item.dataset.bound = '1';
        console.log('绑定侧边栏项目:', index, item);
        
        item.addEventListener('click', function(e) {
            console.log('侧边栏项目被点击');
            if (this.classList.contains('sidebar-add-cate')) {
                console.log('点击的是添加按钮，不执行分类切换');
                return;
            }
            
            e.preventDefault();
            e.stopPropagation();
            
            document.querySelectorAll('.sidebar-cate-item').forEach(i => i.classList.remove('on'));
            this.classList.add('on');
            
            var cid = this.dataset.id;
            window.current_cid = cid;
            var url = tx_host + '?txact=list&cid=' + cid;
            console.log('准备调用 txpostajax, url:', url);
            switchCateWithAnimation(url, 'click');
        });
    });

    // 同时兼容原来的.ajax-item（顶部分类）
    console.log('开始绑定 ajax-item');
    document.querySelectorAll('.ajax-item').forEach(function(item, index) {
        if (item.dataset.bound) return;
        item.dataset.bound = '1';
        console.log('绑定 ajax-item:', index, item);
        
        item.addEventListener('click', function(e) {
            console.log('ajax-item 被点击');
            e.preventDefault();
            e.stopPropagation();
            
            var url = this.dataset.url;
            var urlMatch = url && url.match(/cid=(\d+)/);
            if (urlMatch && urlMatch[1]) {
                window.current_cid = urlMatch[1];
            }
            console.log('准备调用 txpostajax, url:', url);
            switchCateWithAnimation(url, 'click');
        });
    });
}

var currentRightClickItem = null;

var _toggleControlCenter = toggleControlCenter;
toggleControlCenter = function() {
    _toggleControlCenter();
    setTimeout(function() {
        initTimeSettings();
        bindTimeSettings();
    }, 50);
};

document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    var menu = document.getElementById('rightMenu');
    
    currentRightClickItem = null;
    var setItem = e.target.closest('.set-item');
    var sidebarCateItem = e.target.closest('.sidebar-cate-item');
    
    var editItem = menu.querySelector('.menu-item-edit');
    var deleteItem = menu.querySelector('.menu-item-delete');
    var allDividers = menu.querySelectorAll('.menu-divider');
    var menuItems = menu.querySelectorAll('.menu-item');
    
    if (setItem || sidebarCateItem) {
        currentRightClickItem = setItem || sidebarCateItem;
        editItem.style.display = 'flex';
        deleteItem.style.display = 'flex';
        allDividers[0].style.display = 'block';
        allDividers[1].style.display = 'block';
        for (var i = 2; i < 7; i++) {
            menuItems[i].style.display = 'none';
        }
    } else {
        editItem.style.display = 'none';
        deleteItem.style.display = 'none';
        allDividers[0].style.display = 'none';
        allDividers[1].style.display = 'block';
        for (var i = 2; i < 7; i++) {
            menuItems[i].style.display = 'flex';
        }
    }
    
    menu.style.display = 'block';
    menu.style.left = e.clientX + 'px';
    menu.style.top = e.clientY + 'px';
    
    if (document.body.classList.contains('tx-night')) {
        document.getElementById('menu-dark-icon').className = 'iconfont icon-heitian';
        document.getElementById('menu-dark-text').textContent = '明亮模式';
    } else {
        document.getElementById('menu-dark-icon').className = 'iconfont icon-baitian';
        document.getElementById('menu-dark-text').textContent = '暗黑模式';
    }
});

document.addEventListener('click', function(e) {
    if (!e.target.closest('#rightMenu')) {
        document.getElementById('rightMenu').style.display = 'none';
    }
});

function addWebsite(e) {
    if (e) e.stopPropagation();
    document.getElementById('rightMenu').style.display = 'none';
    var cid = document.getElementById('getid').value || window.current_cid || '2';
    var fakeBtn = document.createElement('a');
    fakeBtn.setAttribute('data-id', cid);
    txPostIDpop(fakeBtn, '添加网站', '.article-box');
}

function toggleDarkMode(e) {
    if (e) e.stopPropagation();
    document.getElementById('rightMenu').style.display = 'none';
    document.body.classList.toggle('tx-night');
    if (document.body.classList.contains('tx-night')) {
        zbp.cookie.set('tx_bgstyle', 'on', 365);
    } else {
        zbp.cookie.set('tx_bgstyle', 'off', 365);
    }
}

function toggleControlCenter(e) {
    if (e) e.stopPropagation();
    document.getElementById('rightMenu').style.display = 'none';
    var cc = document.getElementById('controlCenter');
    cc.style.display = cc.style.display === 'block' ? 'none' : 'block';
    
    if (cc.style.display === 'block') {
        bindControlCenterMenu();
        loadDockSettings();
    }
}

function loadDockSettings() {
    var dockEnabled = zbp.cookie.get('dockEnabled') !== '0';
    var bgColor = zbp.cookie.get('sidebarBgColor') || '#4b4b4b';
    var opacity = zbp.cookie.get('sidebarOpacity') || '17';
    var blur = zbp.cookie.get('sidebarBlur');
    
    document.getElementById('dockEnabled').checked = dockEnabled;
    document.getElementById('sidebarBgColor').value = bgColor;
    document.getElementById('sidebarOpacity').value = opacity;
    
    if (blur === '0') {
        document.getElementById('sidebarBlur').checked = false;
    }
    
    var textColor = zbp.cookie.get('iconTextColor');
    var iconBgColor = zbp.cookie.get('iconBgColor');
    var size = zbp.cookie.get('iconSize');
    var radius = zbp.cookie.get('iconRadius');
    var gapX = zbp.cookie.get('iconGapX');
    var gapY = zbp.cookie.get('iconGapY');
    
    if (textColor) document.getElementById('iconTextColor').value = textColor;
    if (iconBgColor) document.getElementById('iconBgColor').value = iconBgColor;
    if (size) document.getElementById('iconSize').value = size;
    if (radius) document.getElementById('iconRadius').value = radius;
    if (gapX) document.getElementById('iconGapX').value = gapX;
    if (gapY) document.getElementById('iconGapY').value = gapY;
    
    updateSliderValue('sidebarOpacity');
    updateSliderValue('iconSize');
    updateSliderValue('iconRadius');
    updateSliderValue('iconGapX');
    updateSliderValue('iconGapY');
}

function bindControlCenterMenu() {
    var menuItems = document.querySelectorAll('.cc-menu-item');
    menuItems.forEach(function(item) {
        item.onclick = function() {
            var panel = this.dataset.panel;
            
            menuItems.forEach(function(i) {
                i.classList.remove('active');
            });
            this.classList.add('active');
            
            var panelItems = document.querySelectorAll('.cc-panel-item');
            panelItems.forEach(function(p) {
                p.classList.remove('cc-panel-active');
                if (p.dataset.panel === panel) {
                    p.classList.add('cc-panel-active');
                }
            });
        };
    });
}

function hexToRgb(hex) {
    var r = parseInt(hex.slice(1, 3), 16);
    var g = parseInt(hex.slice(3, 5), 16);
    var b = parseInt(hex.slice(5, 7), 16);
    return {r, g, b};
}

function toggleDock() {
    var checkbox = document.getElementById('dockEnabled');
    var sidebar = document.querySelector('.mtab-sidebar');
    var main = document.querySelector('.mtab-main');
    var header = document.querySelector('.mtab-header');
    
    if (checkbox.checked) {
        sidebar.style.transform = 'translateX(0)';
        main.style.marginLeft = '54px';
        header.style.marginLeft = '54px';
        zbp.cookie.set('dockEnabled', '1', 365);
    } else {
        sidebar.style.transform = 'translateX(-100%)';
        main.style.marginLeft = '0';
        header.style.marginLeft = '0';
        zbp.cookie.set('dockEnabled', '0', 365);
    }
}

function setSidebarBgColor() {
    var color = document.getElementById('sidebarBgColor').value;
    var opacity = (document.getElementById('sidebarOpacity').value || 17) / 100;
    var rgb = hexToRgb(color);
    var rgba = 'rgba(' + rgb.r + ', ' + rgb.g + ', ' + rgb.b + ', ' + opacity + ')';
    
    var sidebar = document.querySelector('.mtab-sidebar');
    sidebar.style.backgroundColor = rgba;
    
    zbp.cookie.set('sidebarBgColor', color, 365);
}

function setSidebarOpacity() {
    var color = document.getElementById('sidebarBgColor').value;
    var opacity = document.getElementById('sidebarOpacity').value / 100;
    var rgb = hexToRgb(color);
    var rgba = 'rgba(' + rgb.r + ', ' + rgb.g + ', ' + rgb.b + ', ' + opacity + ')';
    
    var sidebar = document.querySelector('.mtab-sidebar');
    sidebar.style.backgroundColor = rgba;
    
    zbp.cookie.set('sidebarOpacity', document.getElementById('sidebarOpacity').value, 365);
}

function toggleSidebarBlur() {
    var sidebar = document.querySelector('.mtab-sidebar');
    var checkbox = document.getElementById('sidebarBlur');
    
    if (checkbox.checked) {
        sidebar.style.backdropFilter = 'blur(8px)';
        zbp.cookie.set('sidebarBlur', '1', 365);
    } else {
        sidebar.style.backdropFilter = 'none';
        zbp.cookie.set('sidebarBlur', '0', 365);
    }
}

function setIconTextColor() {
    var color = document.getElementById('iconTextColor').value;
    document.documentElement.style.setProperty('--icon-name-color', color);
    zbp.cookie.set('iconTextColor', color, 365);
}

function setIconBgColor() {
    var color = document.getElementById('iconBgColor').value;
    document.documentElement.style.setProperty('--icon-bg-color', color);
    zbp.cookie.set('iconBgColor', color, 365);
}

function setIconSize() {
    var size = document.getElementById('iconSize').value;
    size = Math.max(60, Math.min(80, parseInt(size)));
    document.getElementById('iconSize').value = size;
    document.documentElement.style.setProperty('--icon-size', size + 'px');
    zbp.cookie.set('iconSize', size, 365);
}

function setIconRadius() {
    var radius = document.getElementById('iconRadius').value;
    document.documentElement.style.setProperty('--icon-radius', radius + 'px');
    zbp.cookie.set('iconRadius', radius, 365);
}

function setIconGapX() {
    var gap = document.getElementById('iconGapX').value;
    document.documentElement.style.setProperty('--icon-gap-x', gap + 'px');
    zbp.cookie.set('iconGapX', gap, 365);
}

function setIconGapY() {
    var gap = document.getElementById('iconGapY').value;
    document.documentElement.style.setProperty('--icon-gap-y', gap + 'px');
    zbp.cookie.set('iconGapY', gap, 365);
}

function updateSliderValue(id) {
    var val = document.getElementById(id).value;
    document.getElementById(id + 'Val').textContent = val;
}

function editCurrentItem(e) {
    if (e) e.stopPropagation();
    if (!currentRightClickItem) return;
    document.getElementById('rightMenu').style.display = 'none';
    
    openAddTabModal(e, true);
    
    setTimeout(function() {
        $('.add-tab-modal .tab-btn[data-tab="manual"]').click();
        
        var delBtn = currentRightClickItem.querySelector('.del-btn a:last-child');
        
        if (delBtn && delBtn.dataset.type !== 'cate') {
            var name = currentRightClickItem.querySelector('.data-name') ? currentRightClickItem.querySelector('.data-name').textContent : '';
            var img = currentRightClickItem.querySelector('.data-img') ? currentRightClickItem.querySelector('.data-img').src : '';
            var url = currentRightClickItem.querySelector('a') ? currentRightClickItem.querySelector('a').href : '';
            
            var bgColor = $(currentRightClickItem).attr('data-bg-color') || '#ffffff';
            
            function fillData() {
                var $tab = $('.tab-pane[data-tab="manual"]');
                
                $tab.find('input[name="modal_name"]').val(name);
                $tab.find('input[name="modal_img"]').val(img);
                $tab.find('input[name="modal_url"]').val(url);
                $tab.find('input[name="modal_color"]').val(bgColor);
                $tab.find('input[name="modal_modify"]').val('on');
                $('#getid').val(delBtn.dataset.id);
                
                var colorOptions = $tab.find('.color-option:not(.color-picker-wrap)');
                colorOptions.removeClass('active');
                colorOptions.each(function() {
                    var optionColor = $(this).attr('data-color') || '';
                    var targetColor = bgColor.toLowerCase().trim();
                    if (optionColor === targetColor) {
                        $(this).addClass('active');
                    }
                });
            }
            
            fillData();
            setTimeout(fillData, 200);
            setTimeout(fillData, 500);
        }
    }, 200);
}

function deleteCurrentItem(e) {
    if (e) e.stopPropagation();
    if (!currentRightClickItem) return;
    document.getElementById('rightMenu').style.display = 'none';
    
    var delBtn = currentRightClickItem.querySelector('.del-btn a:first-child');
    if (delBtn) {
        txPostIDpop(delBtn, '删除', '.del-box');
    } else if (currentRightClickItem.classList.contains('sidebar-cate-item')) {
        currentRightClickItem.setAttribute('data-type', 'cate');
        txPostIDpop(currentRightClickItem, '删除', '.del-box');
    }
}

function changeWallpaper(n) {
    var bg = window.zbp_host + 'zb_users/plugin/wx_nav/style/img/bg' + n + '.jpg';
    document.body.style.backgroundImage = 'url(' + bg + ')';
    zbp.cookie.set('bgcolor', bg, 365);
    zbp.cookie.set('bgstyle', '2', 365);
}

document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        var dockEnabled = zbp.cookie.get('dockEnabled') !== '0';
        var bgColor = zbp.cookie.get('sidebarBgColor') || '#4b4b4b';
        var opacity = (zbp.cookie.get('sidebarOpacity') || 17) / 100;
        var blur = zbp.cookie.get('sidebarBlur');
        var sidebar = document.querySelector('.mtab-sidebar');
        var main = document.querySelector('.mtab-main');
        var header = document.querySelector('.mtab-header');
        var rgb = hexToRgb(bgColor);
        var rgba = 'rgba(' + rgb.r + ', ' + rgb.g + ', ' + rgb.b + ', ' + opacity + ')';
        
        if (!dockEnabled) {
            sidebar.style.transform = 'translateX(-100%)';
            main.style.marginLeft = '0';
            header.style.marginLeft = '0';
        }
        
        sidebar.style.backgroundColor = rgba;
        
        if (blur === '0') {
            sidebar.style.backdropFilter = 'none';
        }
        
        var textColor = zbp.cookie.get('iconTextColor');
        var iconBgColor = zbp.cookie.get('iconBgColor');
        var size = zbp.cookie.get('iconSize');
        var radius = zbp.cookie.get('iconRadius');
        var gapX = zbp.cookie.get('iconGapX');
        var gapY = zbp.cookie.get('iconGapY');
        var icons = document.querySelectorAll('.set-item .tx-icon');
        
        if (textColor) {
            icons.forEach(function(icon) {
                icon.style.color = textColor;
            });
        }
        
        if (iconBgColor) {
            icons.forEach(function(icon) {
                icon.style.backgroundColor = iconBgColor;
            });
        }
        
        if (size) {
            icons.forEach(function(icon) {
                icon.style.width = size + 'px';
                icon.style.height = size + 'px';
                icon.style.fontSize = (size * 0.5) + 'px';
            });
        }
        
        if (radius) {
            icons.forEach(function(icon) {
                icon.style.borderRadius = radius + 'px';
            });
        }
        
        if (gapX) {
            document.documentElement.style.setProperty('--icon-gap-x', gapX + 'px');
        }
        
        if (gapY) {
            document.documentElement.style.setProperty('--icon-gap-y', gapY + 'px');
        }
        
        var lists = document.querySelectorAll('.nav-list ul');
        lists.forEach(function(list) {
            if (typeof Sortable !== 'undefined') {
                Sortable.create(list, {
                    animation: 150,
                    handle: '.set-item',
                    ghostClass: 'sortable-ghost',
                    dragClass: 'sortable-drag'
                });
            }
        });
    }, 100);
});

function openAddTabModal(e, isEdit) {
    if (e) e.stopPropagation();
    document.getElementById('rightMenu').style.display = 'none';
    var modal = document.getElementById('addTabModal');
    if (modal) {
        modal.classList.add('show');
        initModalTabs();
        
        var cid = window.current_cid || '2';
        document.getElementById('getid').value = cid;
        
        if (!isEdit) {
            $('#addTabModal .tx-set-data').val('');
            $('#addTabModal input[name="modal_modify"]').val('');
            $('input[name="modal_color"]').val('#ffffff');
        }
    }
}

function closeAddTabModal() {
    var modal = document.getElementById('addTabModal');
    if (modal) {
        modal.classList.remove('show');
    }
}

function initModalTabs() {
    var tabBtns = document.querySelectorAll('.add-tab-modal .tab-btn');
    var tabPanes = document.querySelectorAll('.add-tab-modal .tab-pane');
    
    tabBtns.forEach(function(btn) {
        if (btn.dataset.tabBound) return;
        btn.dataset.tabBound = '1';
        
        btn.addEventListener('click', function() {
            var targetTab = this.dataset.tab;
            
            tabBtns.forEach(function(b) {
                b.classList.remove('active');
            });
            this.classList.add('active');
            
            tabPanes.forEach(function(pane) {
                pane.classList.remove('active');
                if (pane.dataset.tab === targetTab) {
                    pane.classList.add('active');
                }
            });
        });
    });
}

function createNewFolder(e) {
    if (e) e.stopPropagation();
    document.getElementById('rightMenu').style.display = 'none';
    var fakeBtn = document.createElement('a');
    txPostIDpop(fakeBtn, '添加分类', '.cate-box');
}

function openWallpaperSettings(e) {
    if (e) e.stopPropagation();
    document.getElementById('rightMenu').style.display = 'none';
    toggleControlCenter();
}

function toggleBatchEdit(e) {
    if (e) e.stopPropagation();
    document.getElementById('rightMenu').style.display = 'none';
    document.body.classList.toggle('tx-batch-edit');
}

function openSettings(e) {
    if (e) e.stopPropagation();
    document.getElementById('rightMenu').style.display = 'none';
    toggleControlCenter();
}

document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        initCurrentCid();
        
        var modal = document.getElementById('addTabModal');
        if (modal) {
            modal.querySelector('.modal-mask').addEventListener('click', function(e) {
                if (e.target === this) {
                    closeAddTabModal();
                }
            });
        }
        
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeAddTabModal();
            }
        });
        
        initModalTabs();
        initColorOptions();
    }, 200);
});



function initCurrentCid() {
    var activeCate = document.querySelector('.nav-cate .on a');
    if (activeCate) {
        var cidMatch = activeCate.getAttribute('data-url').match(/cid=(\d+)/);
        if (cidMatch) {
            window.current_cid = cidMatch[1];
        } else {
            window.current_cid = '2';
        }
    } else {
        window.current_cid = '2';
    }
}

function getCurrentCid() {
    var cid = window.current_cid;
    if (!cid) {
        var urlParams = new URLSearchParams(window.location.search);
        cid = urlParams.get('cid');
    }
    return cid || '2';
}

function initColorOptions() {
    var colorOptions = document.querySelectorAll('.add-tab-modal .color-option:not(.color-picker-wrap)');
    var colorPicker = document.getElementById('bgColorPicker');
    var colorInput = document.querySelector('input[name="modal_color"]');
    
    colorOptions.forEach(function(option) {
        if (option.dataset.colorBound) return;
        option.dataset.colorBound = '1';
        
        option.addEventListener('click', function() {
            colorOptions.forEach(function(o) {
                o.classList.remove('active');
            });
            this.classList.add('active');
            
            var bgColor = this.style.backgroundColor || '#ffffff';
            if (this.classList.contains('transparent')) {
                bgColor = 'transparent';
            }
            if (colorInput) {
                colorInput.value = bgColor;
            }
        });
    });
    
    if (colorPicker && !colorPicker.dataset.bound) {
        colorPicker.dataset.bound = '1';
        
        colorPicker.addEventListener('change', function() {
            colorOptions.forEach(function(o) {
                o.classList.remove('active');
            });
            if (colorInput) {
                colorInput.value = this.value;
            }
        });
    }
}

$(document).on('click', '.add-tab-modal .btn-submit-add', function(e) {
    e.preventDefault();
    var $tab = $('.tab-pane[data-tab="manual"]');
    console.log('✅ 提交前颜色值:', $tab.find('input[name="modal_color"]').val());
    
    var form = $(this).closest('form')[0];
    txpostsubmitCustom(form, 'post', 'add');
});

$(document).on('click', '.add-tab-modal .btn-get-icon', function(e) {
    e.preventDefault();
    console.log('点击了获取信息按钮');
    
    var $url = $('#addTabModal input[name="modal_url"]');
    var getIconBtn = this;
    
    if ($url.length === 0) {
        alert('页面加载异常，请刷新重试');
        return;
    }
    var url = $url.val().trim();
    console.log('输入的URL:', url);
    
    if (!url) {
        alert('请先输入网址');
        return;
    }
    
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'https://' + url;
        $url.val(url);
    }
    
    getIconBtn.textContent = '获取中...';
    getIconBtn.disabled = true;
    
    var faviconUrl = bloghost + 'zb_users/plugin/wx_nav/getFavicon/get.php?url=' + url;
    console.log('Favicon地址:', faviconUrl);
    $('#addTabModal input[name="modal_img"]').val(faviconUrl);
    
    fetchSiteMeta(url);
});

function extractDomain(url) {
    var domain;
    try {
        domain = new URL(url).hostname;
    } catch (e) {
        domain = url.replace(/^(https?:\/\/)?/, '').replace(/\/.*$/, '');
    }
    return domain;
}

function fetchSiteMeta(url) {
    var getIconBtn = document.querySelector('.add-tab-modal .btn-get-icon');
    var domain = extractDomain(url);
    var $name = $('#addTabModal input[name="modal_name"]');
    var $info = $('#addTabModal textarea[name="modal_info"]');
    
    console.log('开始抓取:', url);
    
    var apiUrl = '/zb_users/plugin/wx_nav/plugin/get_meta.php?url=' + encodeURIComponent(url);
    console.log('请求地址:', apiUrl);
    
    $.ajax({
        type: "GET",
        url: apiUrl,
        dataType: "json",
        timeout: 10000,
        cache: false,
        success: function(data){
            console.log('请求成功:', data);
            
            if (data) {
                if ($name.length > 0 && !$name.val() && data.title) {
                    $name.val(data.title.trim().substring(0, 50));
                }
                if ($info.length > 0 && !$info.val() && data.description) {
                    $info.val(data.description.trim().substring(0, 200));
                }
            }
            
            if ($name.length > 0 && !$name.val()) {
                $name.val(formatDomain(domain));
            }
            
            getIconBtn.textContent = '获取信息';
            getIconBtn.disabled = false;
            txTips('获取完成！');
        },
        error: function(xhr, status, error) {
            console.log('请求失败:', status, error);
            console.log('状态码:', xhr.status);
            console.log('返回内容:', xhr.responseText);
            
            if ($name.length > 0 && !$name.val()) {
                $name.val(formatDomain(domain));
            }
            
            getIconBtn.textContent = '获取信息';
            getIconBtn.disabled = false;
            txTips('获取完成');
        }
    });
}

function formatDomain(domain) {
    domain = domain.replace(/^www\./, '');
    var parts = domain.split('.');
    if (parts.length > 2) {
        return parts.slice(0, -1).join('.');
    }
    return parts[0];
}

function saveTab(btn, continueAdd) {
    console.log('saveTab 被调用, btn:', btn);
    var form = $(btn).closest('.tx-form-dom')[0];
    console.log('找到的 form:', form);
    
    if (!form) {
        alert('找不到表单元素，正在刷新页面...');
        window.location.reload();
        return false;
    }
    
    var modify = $('input[name="modal_modify"]').val();
    if (modify !== 'on') {
        $('#getid').val(window.current_cid || '2');
    }
    
    var result = txpostsubmitCustom(form, 'post', 'add');
    
    if (!continueAdd) {
        setTimeout(function() {
            closeAddTabModal();
        }, 500);
    }
    
    return result;
}

function txpostsubmitCustom(form, type, action) {
    console.log('txpostsubmitCustom 被调用, form:', form, 'type:', type, 'action:', action);
    var $form = $(form);
    console.log('$form:', $form);
    
    var nameInput = $form.find('input[name="modal_name"]');
    var name = nameInput.val();
    console.log('nameInput:', nameInput, 'name:', name);
    
    var urlInput = $form.find('input[name="modal_url"]');
    var url = urlInput.val();
    console.log('urlInput:', urlInput, 'url:', url);
    
    if (!name || name === '') {
        alert('标题没有填写！');
        return false;
    }
    if (!url || url === '') {
        alert('网站链接没有填写！');
        return false;
    }
    
    var color = $form.find('input[name="modal_color"]').val() || '#ffffff';
    
    var postData = {
        name: name,
        url: url,
        img: $form.find('input[name="modal_img"]').val() || '',
        info: color,
        order: $form.find('input[name="modal_order"]').val() || '99',
        cateID: window.current_cid || '2',
        author: $form.find('input[name="modal_author"]').val() || '',
        token: $form.find('input[name="modal_token"]').val() || '',
        modify: $form.find('input[name="modal_modify"]').val() || '',
        type: type,
        action: action
    };
    
    console.log('提交的数据:', postData);
    console.log('bloghost:', bloghost);
    console.log('提交地址:', bloghost + 'zb_users/plugin/wx_nav/plugin/acceptdata.php');
    
    if (postData.modify === 'on') {
        postData.cateID = $('#getid').val();
    }
    
    $.post(bloghost + 'zb_users/plugin/wx_nav/plugin/acceptdata.php', postData, function(data) {
        console.log('acceptdata.php 返回:', data);
        txTips(data);
        setTimeout(function() {
            var cid = window.current_cid || getCurrentCid();
            if (cid) {
                window.location.href = window.location.pathname + '?cid=' + cid;
            } else {
                window.location.reload();
            }
        }, 800);
    }).fail(function(xhr, status, error) {
        console.log('请求失败:', xhr, status, error);
        alert('请求失败，请查看控制台！');
    });
    
    return false;
}





/* 🔴 终极颜色绑定 - mousedown 优先级最高！干掉所有旧绑定！ */
$(document).off('mousedown', '.add-tab-modal .color-option:not(.color-picker-wrap)').on('mousedown', '.add-tab-modal .color-option:not(.color-picker-wrap)', function(e) {
    e.stopImmediatePropagation();
    e.preventDefault();
    
    var colorOptions = $('.add-tab-modal .color-option:not(.color-picker-wrap)');
    var colorInput = $('.tab-pane[data-tab="manual"] input[name="modal_color"]');
    
    colorOptions.removeClass('active');
    $(this).addClass('active');
    
    var bgColor = $(this).attr('data-color') || '#ffffff';
    colorInput.val(bgColor);
    
    return false;
});

/* 🔴 终极暴力上色！原生 JS 干死 CSS !important！ */
function forceColorOnIcons() {
    var items = document.querySelectorAll('.set-item[data-bg-color]');
    for (var i = 0; i < items.length; i++) {
        var item = items[i];
        var bgColor = item.getAttribute('data-bg-color');
        if (bgColor) {
            var img = item.querySelector('.data-img');
            if (img) {
                img.style.backgroundColor = bgColor;
                img.setAttribute('style', 'background-color: ' + bgColor + ' !important;');
            }
        }
    }
}

$(function() {
    setTimeout(forceColorOnIcons, 100);
    setTimeout(forceColorOnIcons, 300);
    setTimeout(forceColorOnIcons, 800);
    setTimeout(forceColorOnIcons, 1500);
});

/* 🔴 鼠标滚轮切换分类功能 - 官方演示站同款顺滑效果 */
var cateScrollLock = false;
function switchCateByScroll(direction) {
    if (cateScrollLock) return;
    
    var allCates = [];
    document.querySelectorAll('.ajax-item').forEach(function(item) {
        var urlMatch = item.dataset.url && item.dataset.url.match(/cid=(\d+)/);
        if (urlMatch && urlMatch[1]) {
            allCates.push({
                id: urlMatch[1],
                url: item.dataset.url,
                element: item
            });
        }
    });
    
    if (allCates.length === 0) return;
    
    var currentCid = window.current_cid || getCurrentCid();
    var currentIndex = allCates.findIndex(function(c) { return c.id == currentCid; });
    
    if (currentIndex === -1) currentIndex = 0;
    
    if (direction === 'down') {
        currentIndex = (currentIndex + 1) % allCates.length;
    } else {
        currentIndex = (currentIndex - 1 + allCates.length) % allCates.length;
    }
    
    var targetCate = allCates[currentIndex];
    window.current_cid = targetCate.id;
    
    switchCateWithAnimation(targetCate.url, direction);
    
    cateScrollLock = true;
    setTimeout(function() { cateScrollLock = false; }, 1000);
}

/* 🔴 分类切换动画 - 滚轮/点击共用 */
function switchCateWithAnimation(url, direction) {
    var mainInfo = document.querySelector('.main-info');
    if (mainInfo) {
        mainInfo.style.transition = 'all 0.25s ease-out';
        if (direction === 'down') {
            mainInfo.style.transform = 'translateY(-60px)';
        } else if (direction === 'up') {
            mainInfo.style.transform = 'translateY(60px)';
        } else {
            mainInfo.style.transform = 'scale(0.95)';
        }
        mainInfo.style.opacity = '0';
        
        setTimeout(function() {
            txpostajax(url);
            
            setTimeout(function() {
                var newMainInfo = document.querySelector('.main-info');
                if (newMainInfo) {
                    if (direction === 'down') {
                        newMainInfo.style.transform = 'translateY(60px)';
                    } else if (direction === 'up') {
                        newMainInfo.style.transform = 'translateY(-60px)';
                    } else {
                        newMainInfo.style.transform = 'scale(1.05)';
                    }
                    newMainInfo.style.opacity = '0';
                    newMainInfo.offsetHeight;
                    newMainInfo.style.transition = 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                    newMainInfo.style.transform = 'translateY(0) scale(1)';
                    newMainInfo.style.opacity = '1';
                }
            }, 80);
        }, 250);
    } else {
        txpostajax(url);
    }
}

/* 🔴 滚轮事件监听 - 修复版：阈值从 20 改为 80，避免阻止正常页面滚动 */
document.addEventListener('wheel', function(e) {
    if ($('.tx-pop').length > 0 || $('.set-on-box').length > 0) {
        return;
    }
    
    // 修复：增大阈值到 80，只有大幅滚动才切换分类
    var deltaThreshold = 80;
    if (Math.abs(e.deltaY) > deltaThreshold) {
        e.preventDefault();
        if (e.deltaY > 0) {
            switchCateByScroll('down');
        } else if (e.deltaY < 0) {
            switchCateByScroll('up');
        }
    }
}, { passive: false });

console.log('MTAB JS v1.54 加载完成 - 滚轮阈值已修复为 80');
