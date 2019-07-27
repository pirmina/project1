# JTBC_GLOBAL_Html

JTBC 글로벌 브로슈어

## 실행방법

cmd로 터미널을 연 후
> cd d:/해당폴더
> pwd  현재위치표시

*- windows : git bash 설치후 사용하면 폴더이동이 용이합니다.*
*- mac : 터미널 cd ./해당폴더*

서버구동
> gulp connect

테스크 실행
> gulp default  (watch 기능 포함)

dist 폴더(clean) 정리
> gulp clean

*- **서버구동 터미널*** *과 **테스크 실행 터미널** 창2개를 실행하시고 작업하세요.*

---

## 마크업 작성방법
### Layout
/js/include-html.js 로 header, gnb, footer 각각의 id로
/layout폴더 아래 header.html, gnb.html, footer.html 파일을 불러옵니다.

### LESS 사용
#### **구조**
style.less 에서 순서대로 import 시키는 구조입니다.

```
@import "_reset"; //기본 reset 스타일
@import "_mixin"; //mixin
@import "_variables"; //variables
@import "_sprite"; //sprite images (gulp sprite 로 생성됨)
@import "_common"; //작성된 스타일
@import "_main";  //메인 스타일
```

#### **sprite image**
 1. sprite이미지는 png로만 images/sp/ 폴더에 저장합니다. (www/images/sp/파일명.png는 생성되지 않음, 레티나 이미지는 dev/images/sp/파일명_2x.png 으로 통일합니다.)
 2. html

```
<h1><span clas="sp_ico logo_jtbc">JTBC</span></h1> //이미지텍스트

<ol class="navigation">
	<li class="home"><span class="sp_ico ico_home">Home</span></li>
	<li class="current">Scripted</li>
</ol>
```

 3. less

```

.logo_jtbc{
    .sprite(@logo-jtbc); //이미지 불러오기
}
.bg_ico_arrow_r(){
	.sprite(@ico-arrow-r);  //bg함수만들기
}
.navigation{
	...
	li{
		...
		&:after{
			content:'';
			display:block;
			position:absolute;
			left:8px;
			top:50%;
			margin-top:-3px;
			.bg_ico_arrow_r(); //함수적용
		}
	}
}

//Retina Image 사용
//width,height,background-size, background-position 값 전체적으로 나누기 2 적용
@media all and (min-width:320px) and (max-width:1024px){
	.logo_jtbc{
		.sprite-retina(@logo-jtbc-x2);
	}
}
```

#### **주요 mixin**
 1. 플롯해제
 .clearfix();
 2. 사이즈(width, height)
 .size(width;height;);
 3. font-family
 Verdana폰트 사용시 : .font-family-verdana();
 4. text-overflow
  1줄 말줄임 : .text-ellipsis();
  2줄 말줄임 : .text-ellipsis-2line();

###마크업 가이드
##### 미디어쿼리 분기기준

---

*https://stackedit.io/editor 에서 README를 작성하시면 미리보기가 가능합니다.*
