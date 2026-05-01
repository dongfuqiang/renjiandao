<?php
// 注册插件
RegisterPlugin("mtab", "ActivePlugin_mtab");

/**
 * 插件激活时的回调函数
 */
function ActivePlugin_mtab() {
    // 挂载接口：在首页底部输出MTab
    Add_Filter_Plugin('Filter_Plugin_Index_End', 'MTab_Output');
    // 挂载接口：在后台管理页添加菜单
    Add_Filter_Plugin('Filter_Plugin_Admin_TopMenu', 'MTab_AdminMenu');
}

/**
 * 插件安装时的回调函数，用于初始化配置项
 */
function InstallPlugin_mtab() {
    global $zbp;
    // 检查配置是否存在，不存在则创建默认值
    if (!$zbp->Config('mtab')->HasKey('enabled')) {
        $zbp->Config('mtab')->enabled = true;
        $zbp->Config('mtab')->show_in_index = true;
        $zbp->Config('mtab')->show_in_post = false;
        $zbp->SaveConfig('mtab');
    }
}

/**
 * 插件卸载时的回调函数
 */
function UninstallPlugin_mtab() {
    global $zbp;
    // 删除配置数据
    $zbp->DelConfig('mtab');
}

/**
 * 核心输出函数：挂载到首页
 */
function MTab_Output() {
    global $zbp;
    
    // 获取配置项
    $isEnabled = $zbp->Config('mtab')->enabled;
    $showInIndex = $zbp->Config('mtab')->show_in_index;
    
    // 判断是否开启且在首页显示
    if ($isEnabled && $showInIndex) {
        // 输出MTab的HTML
        $mtabHtml = file_get_contents(dirname(__FILE__) . '/template/index.html');
        echo $mtabHtml;
    }
}

/**
 * 在后台管理页添加菜单
 */
function MTab_AdminMenu(&$menus) {
    global $zbp;
    $menus[] = MakeTopMenu("root", "MTab设置", "plugin.php?act=config&name=mtab", "mtab", "MTab 书签管理插件设置");
}

/**
 * 插件配置页面
 */
function PluginConfig_mtab() {
    global $zbp;
    
    if (isset($_POST['submit'])) {
        $zbp->Config('mtab')->enabled = isset($_POST['enabled']) ? true : false;
        $zbp->Config('mtab')->show_in_index = isset($_POST['show_in_index']) ? true : false;
        $zbp->Config('mtab')->show_in_post = isset($_POST['show_in_post']) ? true : false;
        $zbp->SaveConfig('mtab');
        $zbp->ShowHint('good', '配置已保存');
    }
    
    $enabled_checked = $zbp->Config('mtab')->enabled ? 'checked' : '';
    $show_in_index_checked = $zbp->Config('mtab')->show_in_index ? 'checked' : '';
    $show_in_post_checked = $zbp->Config('mtab')->show_in_post ? 'checked' : '';
    
    $html = <<<HTML
<div class="divMain">
  <h2>MTab 书签管理插件设置</h2>
  <form method="post">
    <p>
      <label><input type="checkbox" name="enabled" value="1" $enabled_checked> 启用MTab插件</label>
    </p>
    <p>
      <label><input type="checkbox" name="show_in_index" value="1" $show_in_index_checked> 在首页显示MTab</label>
    </p>
    <p>
      <label><input type="checkbox" name="show_in_post" value="1" $show_in_post_checked> 在文章页显示MTab</label>
    </p>
    <p>
      <input type="submit" name="submit" value="保存设置" class="button" />
    </p>
  </form>
</div>
HTML;
    
    echo $html;
}