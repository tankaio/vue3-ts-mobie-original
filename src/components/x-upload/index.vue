<!-- <template>
  <div class="x-upload select--act">
    <div class="x-upload__select">
      <input type="file" />
    </div>
    <div class="x-upload__progress" style="--percent: 20">upload__progress</div>
    <div class="x-upload__result">upload__result</div>
    <img src="" alt="upload__preview" class="x-upload__preview" />
  </div>
</template>

<script setup lang="ts">
// https://www.bilibili.com/video/BV1Hu4y1B76c/?spm_id_from=333.788&vd_source=50e501f2ebdd0a20fc0d72e71f64ed0f
const $ = document.querySelector.bind(document)
type DivElement = HTMLDivElement | null
interface UploadDoms {
  container: DivElement
  select: DivElement
  selectFile: HTMLInputElement | null
  progress: DivElement
  cancelBtn: DivElement
  delBtn: DivElement
  img: HTMLImageElement | null
}
onMounted(() => {
  const uploadDoms: UploadDoms = {
    container: $('.x-upload'),
    select: $('.x-upload__select'),
    selectFile: $('.x-upload__select input'),
    progress: $('.x-upload__progress'),
    cancelBtn: $('.x-upload__progress button'),
    delBtn: $('.x-upload__result button'),
    img: $('.x-upload__preview')
  }
  console.log('uploadDoms--', uploadDoms)

  uploadDoms.select?.addEventListener('click', function () {
    uploadDoms.selectFile?.click()
  })
  uploadDoms.selectFile?.addEventListener('change', function (event) {
    console.log('event--', event)
    console.log('this.files--', this.files)
  })

  function showArea(areaName: string): void {
    uploadDoms.container && (uploadDoms.container.className = `upload ${areaName}`)
  }
  function setProgress(value: string): void {
    uploadDoms.progress?.style.setProperty('--percent', value)
  }
})
</script>

<style lang="scss">
.x-upload__select {
  display: none;
}

.x-upload__select input {
  pointer-events: none;
}

.select--act .x-upload__select {
  display: block;
}

.x-upload__progress {
  display: none;
}

.progress--act .x-upload__progress {
  display: block;
}

.x-upload__result {
  display: none;
}

.result--act .x-upload__result {
  display: block;
}

.x-upload__preview {
  display: none;
}

.preview-act .x-upload__preview {
  display: block;
}
</style> -->
