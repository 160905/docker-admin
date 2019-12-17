'use strict';
exports.formatImages = dataList => {
  const formatRepoTag = function(repoTag) {
    let isPrivate = false;
    const repo = repoTag;
    const imagePrefixStr = repo.slice(0, repo.lastIndexOf(':'));
    const image = {};
    const imagePrefixStrArray = imagePrefixStr.split('/');
    // 镜像标签
    image.tag = repo.slice(repo.lastIndexOf(':') + 1);
    if (imagePrefixStrArray.length == 1) {
      // 说明是官方仓库的官方镜像
      image.repo = 'docker.io.com';
      image.username = 'docker';
      image.name = imagePrefixStrArray[0];
    } else {
      // 说明不是官方镜像
      // RepoTags中的item可能为如"localhost:5000/busybox:latest"这种形式 此时为私有镜像
      const socket = imagePrefixStrArray[0].indexOf(':') >= 0;
      // 如果为true说明是私有仓库
      if (socket) {
        isPrivate = true;
        image.repo = imagePrefixStrArray[0];
        if (imagePrefixStrArray.length === 2) {
          // 说明没有用户名默认设置为gyyzyp
          image.username = 'gyyzyp';
          image.name = imagePrefixStrArray[1];
        } else {
          image.username = imagePrefixStrArray[1];
          image.name = imagePrefixStrArray[2];
        }
      } else {
        // 否则为官方仓库的个人镜像
        image.repo = 'docker.io.com';
        image.username = imagePrefixStrArray[0];
        image.name = imagePrefixStrArray[1];
      }
    }
    image.isPrivate = !!isPrivate;
    return image;
  };
  const formatSize = function(size) {
    // K M G T
    switch (true) {
      case size < 900000000:
        return (size / 1000 / 1000).toFixed(2) + 'M';
      default:
        return (size / 1000 / 1000 / 1000).toFixed(2) + 'G';
    }
  };
  const formatData = function(data) {
    const images = [];
    let image = {};
    if (
      !(
        Object.prototype.toString.call(data) === '[object Object]' ||
        Object.prototype.toString.call(data) === '[object Array]'
      )
    ) {
      return {};
    }
    if (Object.prototype.toString.call(data) === '[object Object]') {
      image = formatRepoTag(data.RepoTags[0]);
      image.DockerVersion = data.DockerVersion;
      image.id = data.Id.split(':')[1].slice(0, 10);
      image.time = new Date(data.Created).getTime();
      image.size = formatSize(data.VirtualSize);
      return image;
    }

    for (const index in data) {
      const item = data[index];
      image = formatRepoTag(item.RepoTags[0]);
      image.id =
        item.Id.indexOf(':') >= 0
          ? item.Id.split(':')[1].slice(0, 10)
          : item.Id.slice(0, 10); // 兼容低版本docker engine
      image.fullId =
        item.Id.indexOf(':') >= 0 ? item.Id.split(':')[1] : item.Id; // 兼容低版本docker engine
      image.time = item.Created * 1000;
      image.size = formatSize(item.VirtualSize);
      if (image.isPrivate) continue;
      images.push(image);
    }
    return images;
  };
  const _data = formatData(dataList);
  _data.sort((a, b) => (a.time ? a.time < b.time : a.id < b.id));
  return _data;
};
