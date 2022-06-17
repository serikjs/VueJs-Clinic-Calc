// import { log } from 'gulp-util';
// import * as flsFunctions from './modules/webp-supports.js';

// flsFunctions.isWebp();

// /**
//  * Получение данных с сервера
//  * @param {*} url - путь запроса
//  * @returns - обьект js
//  */
// const getData = async url => {
// 	let res = await fetch(url);
// 	if (!res.ok) {
// 		throw new Error(`Could not fetch ${url}, status : ${res.status}`);
// 	}
// 	return await res.json();
// };

Vue.component('types', {
	//+++++++++++++++++++//
	props: ['btns', 'answers', 'usercurrentbranch', 'subcurrency', 'factorcurrency'],
	//+++++++++++++++++++//
	data() {
		return {};
	},

	//++++++++++++++++++//
	template: `<div class="main-container"><div class="content">
	<div class="form">
		<div class="form-main__container">
			<h2 class="form__title">Welcome!</h2>
			<h3 class="form__subtitle">Please choose your treatment</h3>
			<div class="btn__list">
				<template v-for="(item, index) in btns">
						<input type="checkbox" class="hide-input"
						:key="'types'+index"
						:name="'types'+index"
						:id="item.name"
						:checked="usercurrentbranch.types.cheked[index].isChecked"
						@click="cheked(item)"
						/>
						<label class="main__btn" :for="item.name">{{item.name}}</label>
				</template>
			</div>
		</div>
	</div>
	<div class="left-section">
		<div class="info" v-for="user in answers">
			<div class="info__container">
				<ul class="info__list">
					<li class="info__elem" v-for="(firstBranch,val,findex) in user.branchs[0]">
						<template v-if="firstBranch.isView">
								<span class="info__elem__title">{{firstBranch.title}}:</span>
								<span class="info__elem__name" v-for="(item, index) in getList(user.branchs,firstBranch.title)" @click="goTo(index,item.link,findex-1)">
									<template v-if="item.price">{{item.name}} - {{(item.price * factorcurrency).toFixed(2)}}{{subcurrency}}, </template>
									<template v-else>{{item.name}}, </template>
								</span>
						</template>
					</li>
				</ul>
				<p class="info__total info__total--last">
						<span class="info__total__title">Total</span>
						<span class="info__total__price">{{(user.totalPrice * factorcurrency).toFixed(2)}}{{subcurrency}}</span>
				</p>
			</div>
		</div>
	</div>
</div></div>`,
	//++++++++++++++++++//

	methods: {
		cheked(elem) {
			this.btns.forEach(element => {
				element.isChecked = false;
			});
			elem.isChecked = true;

			this.$emit('update', { check: this.btns });
		},
		getList(braches, name) {
			let list = [];
			for (let index = 0; index < braches.length; index++) {
				// eslint-disable-next-line no-restricted-syntax
				for (const key in braches[index]) {
					if (braches[index][key].title === name) {
						if (braches[index][key].cheked) {
							braches[index][key].cheked.forEach(element => {
								if (element.isChecked === true) list.push(element);
							});
						} else {
							list.push(braches[index][key]);
						}
					}
				}
			}
			return list;
		},
		goTo(index, link, findex) {
			this.$emit('goto', { index: index, link: link, findex: findex });
		},
	},
});
Vue.component('countries', {
	//++++++++++++++//
	props: [
		'currentslide',
		'totalslide',
		'btns',
		'answers',
		'usercurrentbranch',
		'subcurrency',
		'factorcurrency',
	],
	//++++++++++++++//
	data() {
		return {};
	},

	//++++++++++++++++++//
	template: `<div class="main-container"><div class="content">
	<div class="form">
		<div class="form__container">
			<div class="progress_bar">
				<div class="progress__nav">
					<button class="prev-btn" @click='goBack()'>Back</button>
					<div class="numeric-slide">
						<span class="numeric-slide__current">{{currentslide}}</span>
						/
						<span class="numeric-slide__total">{{totalslide}}</span>
					</div>
				</div>
				<div class="progress__bar" >
					<div class="progress__bar--active" :style="getBar">
					</div>
				</div>
			</div>
			<h3 class="form__subtitle"></h3>
			<div class="btn__list">
				<template v-for="(item, index) in btns">
						<input type="checkbox" class="hide-input"
						:key="'types'+index"
						:name="'types'+index"
						:id="item.name"
						:checked="usercurrentbranch.countries.cheked[index].isChecked"
						@click="cheked(item)"
						/>
						<label class="main__btn" :for="item.name">{{item.name}}</label>
				</template>
			</div>
		</div>
	</div>
	<div class="left-section">
	<div class="info" v-for="user in answers">
		<div class="info__container">
			<ul class="info__list">
				<li class="info__elem" v-for="(firstBranch,val,findex) in user.branchs[0]">
					<template v-if="firstBranch.isView">
							<span class="info__elem__title">{{firstBranch.title}}:</span>
							<span class="info__elem__name" v-for="(item, index) in getList(user.branchs,firstBranch.title)" @click="goTo(index,item.link,findex-1)">
								<template v-if="item.price">{{item.name}} - {{(item.price * factorcurrency).toFixed(2)}}{{subcurrency}}, </template>
								<template v-else>{{item.name}}, </template>
							</span>
					</template>
				</li>
			</ul>
			<p class="info__total info__total--last">
					<span class="info__total__title">Total</span>
					<span class="info__total__price">{{(user.totalPrice * factorcurrency).toFixed(2)}}{{subcurrency}}</span>
			</p>
		</div>
</div>
	</div>
	</div>
</div></div>`,

	//++++++++++++++++++//
	computed: {
		getBar() {
			return {
				width: `${(this.currentslide / this.totalslide) * 100}%`,
			};
		},
	},
	methods: {
		cheked(elem) {
			this.btns.forEach(element => {
				element.isChecked = false;
			});
			elem.isChecked = true;

			this.$emit('update', { check: this.btns });
		},
		getList(braches, name) {
			let list = [];
			for (let index = 0; index < braches.length; index++) {
				for (const key in braches[index]) {
					if (braches[index][key].title === name) {
						if (braches[index][key].cheked) {
							braches[index][key].cheked.forEach(element => {
								if (element.isChecked === true) list.push(element);
							});
						} else {
							list.push(braches[index][key]);
						}
					}
				}
			}
			return list;
		},
		goTo(index, link, findex) {
			this.$emit('goto', { index: index, link: link, findex: findex });
		},
		goBack() {
			this.$emit('goback');
		},
	},
});
Vue.component('clinics', {
	//+++++++++++++++++//
	props: [
		'currentslide',
		'totalslide',
		'btns',
		'answers',
		'usercurrentbranch',
		'subcurrency',
		'factorcurrency',
	],
	//+++++++++++++++++//
	data() {
		return {};
	},

	//+++++++++++++++++//
	template: `<div class="main-container"><div class="content">
	<div class="form">
		<div class="form__container">
			<div class="progress_bar">
				<div class="progress__nav">
					<button class="prev-btn" @click='goBack()'>Back</button>
					<div class="numeric-slide">
					<span class="numeric-slide__current">{{currentslide}}</span>
					/
					<span class="numeric-slide__total">{{totalslide}}</span>
					</div>
				</div>
				<div class="progress__bar" >
					<div class="progress__bar--active" :style="getBar">
					</div>
				</div>
			</div>
			<h3 class="form__subtitle">Please choose your clinic</h3>
			<div class="btn__list">
				<template v-for="(item, index) in btns">
						<input type="checkbox" class="hide-input"
						:key="'types'+index"
						:name="'types'+index"
						:id="item.name"
						:checked="usercurrentbranch.clinics.cheked[index].isChecked"
						@click="cheked(item)"
						/>
						<label class="main__btn" :for="item.name">{{item.name}}</label>
				</template>
			</div>
		</div>
	</div>
	<div class="left-section">
	<div class="info" v-for="user in answers">
	<div class="info__container">
		<ul class="info__list">
			<li class="info__elem" v-for="(firstBranch,val,findex) in user.branchs[0]">
				<template v-if="firstBranch.isView">
						<span class="info__elem__title">{{firstBranch.title}}:</span>
						<span class="info__elem__name" v-for="(item, index) in getList(user.branchs,firstBranch.title)" @click="goTo(index,item.link,findex-1)">
							<template v-if="item.price">{{item.name}} - {{(item.price * factorcurrency).toFixed(2)}}{{subcurrency}}, </template>
							<template v-else>{{item.name}}, </template>
						</span>
				</template>
			</li>
		</ul>
		<p class="info__total info__total--last">
				<span class="info__total__title">Total</span>
				<span class="info__total__price">{{(user.totalPrice * factorcurrency).toFixed(2)}}{{subcurrency}}</span>
		</p>
	</div>
</div>
	</div>
</div></div>`,
	//+++++++++++++++++//
	computed: {
		getBar() {
			return {
				width: `${(this.currentslide / this.totalslide) * 100}%`,
			};
		},
	},
	methods: {
		cheked(elem) {
			this.btns.forEach(element => {
				element.isChecked = false;
			});
			elem.isChecked = true;

			this.$emit('update', { check: this.btns });
		},
		getList(braches, name) {
			let list = [];
			for (let index = 0; index < braches.length; index++) {
				for (const key in braches[index]) {
					if (braches[index][key].title === name) {
						if (braches[index][key].cheked) {
							braches[index][key].cheked.forEach(element => {
								if (element.isChecked === true) list.push(element);
							});
						} else {
							list.push(braches[index][key]);
						}
					}
				}
			}
			return list;
		},
		goTo(index, link, findex) {
			this.$emit('goto', { index: index, link: link, findex: findex });
		},
		goBack() {
			this.$emit('goback');
		},
	},
});
Vue.component('treamentstype', {
	//+++++++++++++//
	props: [
		'currentslide',
		'totalslide',
		'btns',
		'answers',
		'usercurrentbranch',
		'subcurrency',
		'factorcurrency',
	],
	//+++++++++++++//
	data() {
		return {};
	},

	//+++++++++++++++++//
	template: `<div class="main-container"><div class="content">
	<div class="form">
		<div class="form__container">
			<div class="progress_bar">
				<div class="progress__nav">
					<button class="prev-btn" @click='goBack()'>Back</button>
					<div class="numeric-slide">
					<span class="numeric-slide__current">{{currentslide}}</span>
					/
					<span class="numeric-slide__total">{{totalslide}}</span>
					</div>
				</div>
				<div class="progress__bar" >
					<div class="progress__bar--active" :style="getBar">
					</div>
				</div>
			</div>
			<h3 class="form__subtitle">Please select your Treatment Type:</h3>
			<div class="btn__list">
				<template v-for="(item, index) in btns">
						<input type="checkbox" class="hide-input"
						:key="'types'+index"
						:name="'types'+index"
						:id="item.name"
						:checked="usercurrentbranch.treamentstype.cheked[index].isChecked"
						@click="cheked(item)"
						/>
						<label class="main__btn" :for="item.name">{{item.name}}</label>
				</template>
			</div>
		</div>
	</div>
	<div class="left-section">
	<div class="info" v-for="user in answers">
	<div class="info__container">
		<ul class="info__list">
			<li class="info__elem" v-for="(firstBranch,val,findex) in user.branchs[0]">
				<template v-if="firstBranch.isView">
						<span class="info__elem__title">{{firstBranch.title}}:</span>
						<span class="info__elem__name" v-for="(item, index) in getList(user.branchs,firstBranch.title)" @click="goTo(index,item.link,findex-1)">
							<template v-if="item.price">{{item.name}} - {{(item.price * factorcurrency).toFixed(2)}}{{subcurrency}}, </template>
							<template v-else>{{item.name}}, </template>
						</span>
				</template>
			</li>
		</ul>
		<p class="info__total info__total--last">
				<span class="info__total__title">Total</span>
				<span class="info__total__price">{{(user.totalPrice * factorcurrency).toFixed(2)}}{{subcurrency}}</span>
		</p>
	</div>
</div>
	</div>
</div></div>`,
	//+++++++++++++++++++++//

	computed: {
		getBar() {
			return {
				width: `${(this.currentslide / this.totalslide) * 100}%`,
			};
		},
	},
	methods: {
		cheked(elem) {
			this.btns.forEach(element => {
				element.isChecked = false;
			});
			elem.isChecked = true;

			this.$emit('update', { check: this.btns });
		},
		getList(braches, name) {
			let list = [];
			for (let index = 0; index < braches.length; index++) {
				for (const key in braches[index]) {
					if (braches[index][key].title === name) {
						if (braches[index][key].cheked) {
							braches[index][key].cheked.forEach(element => {
								if (element.isChecked === true) list.push(element);
							});
						} else {
							list.push(braches[index][key]);
						}
					}
				}
			}
			return list;
		},
		goTo(index, link, findex) {
			this.$emit('goto', { index: index, link: link, findex: findex });
		},
		goBack() {
			this.$emit('goback');
		},
	},
});
Vue.component('treamentssub', {
	//+++++++++++//
	props: [
		'currentslide',
		'totalslide',
		'btns',
		'answers',
		'usercurrentbranch',
		'currency',
		'subcurrency',
		'factorcurrency',
	],
	//+++++++++++//
	data() {
		return {
			currencyCollapse: false,
		};
	},

	//+++++++++++++++++++//
	template: `<div class="main-container"><div class="content">
	<div class="form">
		<div class="form__container">
			<div class="progress_bar">
				<div class="progress__nav">
					<button class="prev-btn @click='goBack()">Back</button>
					<div class="numeric-slide">
					<span class="numeric-slide__current">{{currentslide}}</span>
					/
					<span class="numeric-slide__total">{{totalslide}}</span>
					</div>
				</div>
				<div class="progress__bar" >
					<div class="progress__bar--active" :style="getBar">
					</div>
				</div>
			</div>
			<h3 class="form__subtitle">Please select Sub Treatment:</h3>
			<div class="btn__list">
				<template v-for="(item, index) in btns">
						<input type="checkbox" class="hide-input"
						:key="'types'+index"
						:name="'types'+index"
						:id="item.name"
						:checked="usercurrentbranch.treamentssub.cheked[index].isChecked"
						@click="cheked(item)"
						/>
						<label class="main__btn" :for="item.name"><span class="main__btn-name">{{item.name}}</span>
						<span class="main__btn-price">{{(item.price * factorcurrency).toFixed(2)}}{{subcurrency}}</span></label>
				</template>
			</div>
		</div>
	</div>
	<div class="left-section">
			<div class="currency" @click="currencyCollapse=!currencyCollapse">
				<p>Currency</p>
				<button class="currency__btn">{{subcurrency}}</button>
			</div>
			<ul class="currency__list" :class="{ show: currencyCollapse }">
				<li
				v-for="(item, index) in currency"
					class="currency__list-item"
					@click="selectCurrency(item.symbol,item.factor)"
				>
					<span>{{item.name}}</span>
					<span>{{item.symbol}}</span>
				</li>
			</ul>
			<div class="info" v-for="user in answers">
			<div class="info__container">
				<ul class="info__list">
					<li class="info__elem" v-for="(firstBranch,val,findex) in user.branchs[0]">
						<template v-if="firstBranch.isView">
								<span class="info__elem__title">{{firstBranch.title}}:</span>
								<span class="info__elem__name" v-for="(item, index) in getList(user.branchs,firstBranch.title)" @click="goTo(index,item.link,findex-1)">
									<template v-if="item.price">{{item.name}} - {{(item.price * factorcurrency).toFixed(2)}}{{subcurrency}}, </template>
									<template v-else>{{item.name}}, </template>
								</span>
						</template>
					</li>
				</ul>
				<p class="info__total info__total--last">
						<span class="info__total__title">Total</span>
						<span class="info__total__price">{{(user.totalPrice * factorcurrency).toFixed(2)}}{{subcurrency}}</span>
				</p>
			</div>
		</div>
	</div>
</div></div>`,
	//++++++++++++++++++++++++//
	computed: {
		getBar() {
			return {
				width: `${(this.currentslide / this.totalslide) * 100}%`,
			};
		},
	},
	//--------------------//
	// watch: {
	// 	subCurrency(val) {
	// 		this.btns.forEach(element => {
	// 			let calc = element.price * this.factorCurrency;
	// 			element.calcPrice = calc.toFixed(2);
	// 		});
	// 	},
	// },
	//--------------------//
	methods: {
		cheked(elem) {
			this.btns.forEach(element => {
				element.isChecked = false;
			});
			elem.isChecked = true;

			this.$emit('update', { check: this.btns, totalPlus: elem.price });
		},
		getList(braches, name) {
			let list = [];
			for (let index = 0; index < braches.length; index++) {
				for (const key in braches[index]) {
					if (braches[index][key].title === name) {
						if (braches[index][key].cheked) {
							braches[index][key].cheked.forEach(element => {
								if (element.isChecked === true) list.push(element);
							});
						} else {
							list.push(braches[index][key]);
						}
					}
				}
			}
			return list;
		},
		goTo(index, link, findex) {
			this.$emit('goto', { index: index, link: link, findex: findex });
		},
		goBack() {
			this.$emit('goback');
		},
		//+++++++++++++++++++//
		selectCurrency(symbol, factor) {
			this.$emit('setglobalcurrency', {
				subCurrency: symbol,
				factorCurrency: factor,
			});
			this.currencyCollapse = !this.currencyCollapse;
		},
		//+++++++++++++++++++//
	},
});
Vue.component('extras', {
	//+++++++++++++++//
	props: [
		'currentslide',
		'totalslide',
		'btns',
		'answers',
		'usercurrentbranch',
		'currency',
		'subcurrency',
		'factorcurrency',
	],
	//+++++++++++++++//

	data() {
		return {
			currencyCollapse: false,
			totalPriceExtras: this.usercurrentbranch.totalPriceBranch.price,
		};
	},

	//++++++++++++++++//
	template: `<div class="main-container"><div class="content">
	<div class="form">
		<div class="form__container">
			<div class="progress_bar">
				<div class="progress__nav">
					<button class="prev-btn @click='goBack()">Back</button>
					<div class="numeric-slide">
					<span class="numeric-slide__current">{{currentslide}}</span>
					/
					<span class="numeric-slide__total">{{totalslide}}</span>
					</div>
				</div>
				<div class="progress__bar" >
					<div class="progress__bar--active" :style="getBar">
					</div>
				</div>
			</div>
			<h3 class="form__subtitle">Any Extras?</h3>
			<div class="btn__list">
				<template v-for="(item, index) in btns">
						<input type="checkbox" class="hide-input"
						:key="'types'+index"
						:name="'types'+index"
						:id="item.name"
						:checked="usercurrentbranch.extras.cheked[index].isChecked"
						@click="cheked(item)"
						/>
						<label class="main__btn main__btn--big" :for="item.name">
							<span class="main__btn-name">{{item.name}}</span>
							<span class="main__btn-price">{{(item.price * factorcurrency).toFixed(2)}}{{subcurrency}}</span></label>
				</template>
			</div>
			<button class="next-btn" @click="extrasGo()">Continue without extras</button>
		</div>
	</div>
	<div class="left-section">
			<div class="currency" @click="currencyCollapse=!currencyCollapse">
				<p>Currency</p>
				<button class="currency__btn">{{subcurrency}}</button>
			</div>
			<ul class="currency__list" :class="{ show: currencyCollapse }">
				<li
				v-for="(item, index) in currency"
					class="currency__list-item"
					@click="selectCurrency(item.symbol,item.factor)"
				>
					<span>{{item.name}}</span>
					<span>{{item.symbol}}</span>
				</li>
			</ul>
		<div class="info" v-for="user in answers">
			<div class="info__container">
				<ul class="info__list">
					<li class="info__elem" v-for="(firstBranch,val,findex) in user.branchs[0]">
						<template v-if="firstBranch.isView">
								<span class="info__elem__title">{{firstBranch.title}}:</span>
								<span class="info__elem__name" v-for="(item, index) in getList(user.branchs,firstBranch.title)" @click="goTo(index,item.link,findex-1)">
									<template v-if="item.price">{{item.name}} - {{(item.price * factorcurrency).toFixed(2)}}{{subcurrency}}, </template>
									<template v-else>{{item.name}}, </template>
								</span>
						</template>
					</li>
				</ul>
				<p class="info__total info__total--last">
						<span class="info__total__title">Total</span>
						<span class="info__total__price">{{(user.totalPrice * factorcurrency).toFixed(2)}}{{subcurrency}}</span>
				</p>
			</div>
		</div>
	</div>
</div></div>`,
	//++++++++++++++++++++++++++//
	computed: {
		getBar() {
			return {
				width: `${(this.currentslide / this.totalslide) * 100}%`,
			};
		},
	},
	//--------------------//
	// watch: {
	// 	subCurrency(val) {
	// 		this.btns.forEach(element => {
	// 			let calc = element.price * this.factorCurrency;
	// 			element.calcPrice = calc.toFixed(2);
	// 		});
	// 	},
	// },
	//--------------------//
	methods: {
		cheked(elem) {
			if (elem.isChecked) {
				elem.isChecked = false;
				this.totalPriceExtras -= elem.price;
			} else {
				elem.isChecked = true;
				this.totalPriceExtras += elem.price;
			}
		},
		extrasGo() {
			this.$emit('update', { check: this.btns, totalPlus: this.totalPriceExtras });
		},
		getList(braches, name) {
			let list = [];
			for (let index = 0; index < braches.length; index++) {
				for (const key in braches[index]) {
					if (braches[index][key].title === name) {
						if (braches[index][key].cheked) {
							braches[index][key].cheked.forEach(element => {
								if (element.isChecked === true) list.push(element);
							});
						} else {
							list.push(braches[index][key]);
						}
					}
				}
			}
			return list;
		},
		goTo(index, link, findex) {
			this.$emit('goto', { index: index, link: link, findex: findex });
		},
		goBack() {
			this.$emit('goback');
		},
		//+++++++++++++++++++//
		selectCurrency(symbol, factor) {
			this.$emit('setglobalcurrency', {
				subCurrency: symbol,
				factorCurrency: factor,
			});
			this.currencyCollapse = !this.currencyCollapse;
		},
		//+++++++++++++++++++//
	},
});
Vue.component('addtreatment', {
	//+++++++++++++++//
	props: [
		'currentslide',
		'totalslide',
		'answers',
		'usercurrentbranch',
		'subcurrency',
		'factorcurrency',
	],
	//+++++++++++++++//
	data() {
		return {};
	},
	//++++++++++++++++++++++//
	template: `<div class="main-container"><div class="content">
	<div class="form">
		<div class="form__container">
			<div class="progress_bar">
				<div class="progress__nav">
					<button class="prev-btn @click='goBack()">Back</button>
					<div class="numeric-slide">
					<span class="numeric-slide__current">{{currentslide}}</span>
					/
					<span class="numeric-slide__total">{{totalslide}}</span>
					</div>
				</div>
				<div class="progress__bar" >
					<div class="progress__bar--active" :style="getBar">
					</div>
				</div>
			</div>
			<h3 class="form__subtitle">Additional Treatment?</h3>
			<div class="btn__list">
						<button class="main__btn main__btn--big" @click="selectYes()">
							Yes
						</button>
						<button class="main__btn main__btn--big" @click="selectNo()">
							No
						</button>
			</div>
		</div>
	</div>
	<div class="left-section">
		<div class="info" v-for="user in answers">
			<div class="info__container">
				<ul class="info__list">
					<li class="info__elem" v-for="(firstBranch,val,findex) in user.branchs[0]">
						<template v-if="firstBranch.isView">
								<span class="info__elem__title">{{firstBranch.title}}:</span>
								<span class="info__elem__name" v-for="(item, index) in getList(user.branchs,firstBranch.title)" @click="goTo(index,item.link,findex-1)">
									<template v-if="item.price">{{item.name}} - {{(item.price * factorcurrency).toFixed(2)}}{{subcurrency}}, </template>
									<template v-else>{{item.name}}, </template>
								</span>
						</template>
					</li>
				</ul>
				<p class="info__total info__total--last">
						<span class="info__total__title">Total</span>
						<span class="info__total__price">{{(user.totalPrice * factorcurrency).toFixed(2)}}{{subcurrency}}</span>
				</p>
			</div>
		</div>
	</div>
</div></div>`,
	//++++++++++++++++//
	computed: {
		getBar() {
			return {
				width: `${(this.currentslide / this.totalslide) * 100}%`,
			};
		},
	},
	methods: {
		selectYes() {
			this.$emit('selectedyes');
		},
		selectNo() {
			this.$emit('selectedno');
		},
		getList(braches, name) {
			let list = [];
			for (let index = 0; index < braches.length; index++) {
				for (const key in braches[index]) {
					if (braches[index][key].title === name) {
						if (braches[index][key].cheked) {
							braches[index][key].cheked.forEach(element => {
								if (element.isChecked === true) list.push(element);
							});
						} else {
							list.push(braches[index][key]);
						}
					}
				}
			}
			return list;
		},
		goTo(index, link, findex) {
			this.$emit('goto', { index: index, link: link, findex: findex });
		},
		goBack() {
			this.$emit('goback');
		},
	},
});
Vue.component('castomertreatment', {
	//+++++++++++++++++++++++//
	props: [
		'currentslide',
		'totalslide',
		'answers',
		'usercurrentbranch',
		'subcurrency',
		'factorcurrency',
	],
	//+++++++++++++++++++++++//
	data() {
		return {};
	},
	//+++++++++++++++++++++++//
	template: `<div class="main-container"><div class="content">
	<div class="form">
		<div class="form__container">
			<div class="progress_bar">
				<div class="progress__nav">
					<button class="prev-btn @click='goBack()">Back</button>
					<div class="numeric-slide">
					<span class="numeric-slide__current">{{currentslide}}</span>
					/
					<span class="numeric-slide__total">{{totalslide}}</span>
					</div>
				</div>
				<div class="progress__bar" >
					<div class="progress__bar--active" :style="getBar">
					</div>
				</div>
			</div>
			<h3 class="form__subtitle">Is the treatment for the same customer?</h3>
			<div class="btn__list">
						<button class="main__btn main__btn--big" @click="selectYes()">
							Yes
						</button>
						<button class="main__btn main__btn--big" @click="selectNo()">
							No
						</button>
			</div>
		</div>
	</div>
	<div class="left-section">
		<div class="info" v-for="user in answers">
			<div class="info__container">
				<ul class="info__list">
					<li class="info__elem" v-for="(firstBranch,val,findex) in user.branchs[0]">
						<template v-if="firstBranch.isView">
								<span class="info__elem__title">{{firstBranch.title}}:</span>
								<span class="info__elem__name" v-for="(item, index) in getList(user.branchs,firstBranch.title)" @click="goTo(index,item.link,findex-1)">
									<template v-if="item.price">{{item.name}} - {{(item.price * factorcurrency).toFixed(2)}}{{subcurrency}}, </template>
									<template v-else>{{item.name}}, </template>
								</span>
						</template>
					</li>
				</ul>
				<p class="info__total info__total--last">
						<span class="info__total__title">Total</span>
						<span class="info__total__price">{{(user.totalPrice * factorcurrency).toFixed(2)}}{{subcurrency}}</span>
				</p>
			</div>
		</div>
	</div>
</div></div>`,
	//++++++++++++++++++++//
	computed: {
		getBar() {
			return {
				width: `${(this.currentslide / this.totalslide) * 100}%`,
			};
		},
	},
	methods: {
		selectYes() {
			this.$emit('selectedyes');
		},
		selectNo() {
			this.$emit('selectedno');
		},
		getList(braches, name) {
			let list = [];
			for (let index = 0; index < braches.length; index++) {
				for (const key in braches[index]) {
					if (braches[index][key].title === name) {
						if (braches[index][key].cheked) {
							braches[index][key].cheked.forEach(element => {
								if (element.isChecked === true) list.push(element);
							});
						} else {
							list.push(braches[index][key]);
						}
					}
				}
			}
			return list;
		},
		goTo(index, link, findex) {
			this.$emit('goto', { index: index, link: link, findex: findex });
		},
		goBack() {
			this.$emit('goback');
		},
	},
});
Vue.component('accomodation', {
	//++++++++++++++++++++++++++++//
	props: [
		'currentslide',
		'totalslide',
		'answers',
		'usercurrentbranch',
		'subcurrency',
		'factorcurrency',
	],
	//++++++++++++++++++++++++++++//
	data() {
		return {};
	},
	//++++++++++++++++++++++++//
	template: `<div class="main-container"><div class="content">
	<div class="form">
		<div class="form__container">
			<div class="progress_bar">
				<div class="progress__nav">
					<button class="prev-btn @click='goBack()">Back</button>
					<div class="numeric-slide">
					<span class="numeric-slide__current">{{currentslide}}</span>
					/
					<span class="numeric-slide__total">{{totalslide}}</span>
					</div>
				</div>
				<div class="progress__bar" >
					<div class="progress__bar--active" :style="getBar">
					</div>
				</div>
			</div>
			<h3 class="form__subtitle">Accomodation?</h3>
			<div class="btn__list">
						<button class="main__btn main__btn--big" @click="selectYes()">
							Yes
						</button>
						<button class="main__btn main__btn--big" @click="selectNo()">
							No
						</button>
			</div>
		</div>
	</div>
	<div class="left-section">
		<div class="info" v-for="user in answers">
			<div class="info__container">
				<ul class="info__list">
					<li class="info__elem" v-for="(firstBranch,val,findex) in user.branchs[0]">
						<template v-if="firstBranch.isView">
								<span class="info__elem__title">{{firstBranch.title}}:</span>
								<span class="info__elem__name" v-for="(item, index) in getList(user.branchs,firstBranch.title)" @click="goTo(index,item.link,findex-1)">
									<template v-if="item.price">{{item.name}} - {{(item.price * factorcurrency).toFixed(2)}}{{subcurrency}}, </template>
									<template v-else>{{item.name}}, </template>
								</span>
						</template>
					</li>
				</ul>
				<p class="info__total info__total--last">
						<span class="info__total__title">Total</span>
						<span class="info__total__price">{{(user.totalPrice * factorcurrency).toFixed(2)}}{{subcurrency}}</span>
				</p>
			</div>
		</div>
	</div>
</div></div>`,
	//+++++++++++++++++++++++//
	computed: {
		getBar() {
			return {
				width: `${(this.currentslide / this.totalslide) * 100}%`,
			};
		},
	},
	methods: {
		selectYes() {
			this.$emit('selectedyes');
		},
		selectNo() {
			this.$emit('selectedno');
		},
		getList(braches, name) {
			let list = [];
			for (let index = 0; index < braches.length; index++) {
				for (const key in braches[index]) {
					if (braches[index][key].title === name) {
						if (braches[index][key].cheked) {
							braches[index][key].cheked.forEach(element => {
								if (element.isChecked === true) list.push(element);
							});
						} else {
							list.push(braches[index][key]);
						}
					}
				}
			}
			return list;
		},
		goTo(index, link, findex) {
			this.$emit('goto', { index: index, link: link, findex: findex });
		},
		goBack() {
			this.$emit('goback');
		},
	},
});
Vue.component('roomtype', {
	//++++++++++++++++//
	props: [
		'currentslide',
		'totalslide',
		'btns',
		'answers',
		'usercurrentbranch',
		'subcurrency',
		'factorcurrency',
	],
	//++++++++++++++++//
	data() {
		return {
			ifViewPopup: false,
		};
	},
	//++++++++++++++++++++++//
	template: `<div class="main-container"><div class="content">
	<div class="form">
		<div class="form-main__container">
		<div class="progress_bar">
				<div class="progress__nav">
					<button class="prev-btn @click='goBack()">Back</button>
					<div class="numeric-slide">
					<span class="numeric-slide__current">{{currentslide}}</span>
					/
					<span class="numeric-slide__total">{{totalslide}}</span>
					</div>
				</div>
				<div class="progress__bar" >
					<div class="progress__bar--active" :style="getBar">
					</div>
				</div>
			</div>
			<h3 class="form__subtitle">Please Choose Room Type:</h3>
			<div class="btn__list">
				<template v-for="(item, index) in btns" >
						<input type="checkbox" class="hide-input"
						:key="'types'+index"
						:name="'types'+index"
						:id="item.name"
						:checked="usercurrentbranch.roomtype.cheked[index].isChecked"
						@click="cheked(item)"
						/>
						<label class="main__btn main__btn--big" :for="item.name">{{item.name}}</label>
				</template>
			</div>
		</div>
	</div>
	<div class="left-section">
		<div class="info" v-for="user in answers">
			<div class="info__container">
				<ul class="info__list">
					<li class="info__elem" v-for="(firstBranch,val,findex) in user.branchs[0]">
						<template v-if="firstBranch.isView">
								<span class="info__elem__title">{{firstBranch.title}}:</span>
								<span class="info__elem__name" v-for="(item, index) in getList(user.branchs,firstBranch.title)" @click="goTo(index,item.link,findex-1)">
									<template v-if="item.price">{{item.name}} - {{(item.price * factorcurrency).toFixed(2)}}{{subcurrency}}, </template>
									<template v-else>{{item.name}}, </template>
								</span>
						</template>
					</li>
				</ul>
				<p class="info__total info__total--last">
						<span class="info__total__title">Total</span>
						<span class="info__total__price">{{(user.totalPrice * factorcurrency).toFixed(2)}}{{subcurrency}}</span>
				</p>
			</div>
		</div>
	</div>
</div>
	<div class="popup"  v-if="ifViewPopup">
	<div class="popup__content">
		<h2 class="popup-title popup-title--blue">
			Please contact Tourismo for other room types
		</h2>
		<button class="next-btn" @click="otherSelect()">I understood, close</button>
	</div>
	</div>
</div>

`,
	//++++++++++++++++++++++++//
	computed: {
		getBar() {
			return {
				width: `${(this.currentslide / this.totalslide) * 100}%`,
			};
		},
	},
	methods: {
		cheked(elem) {
			this.btns.forEach(element => {
				element.isChecked = false;
			});
			elem.isChecked = true;

			if (elem.name != 'Other') {
				this.$emit('update', { check: this.btns });
			} else {
				this.ifViewPopup = true;
			}
		},
		otherSelect() {
			this.$emit('update', { check: this.btns });
		},
		getList(braches, name) {
			let list = [];
			for (let index = 0; index < braches.length; index++) {
				// eslint-disable-next-line no-restricted-syntax
				for (const key in braches[index]) {
					if (braches[index][key].title === name) {
						if (braches[index][key].cheked) {
							braches[index][key].cheked.forEach(element => {
								if (element.isChecked === true) list.push(element);
							});
						} else {
							list.push(braches[index][key]);
						}
					}
				}
			}
			return list;
		},
		goTo(index, link, findex) {
			this.$emit('goto', { index: index, link: link, findex: findex });
		},
		goBack() {
			this.$emit('goback');
		},
	},
});
Vue.component('stars', {
	//+++++++++++++++++++++//
	props: [
		'currentslide',
		'totalslide',
		'btns',
		'answers',
		'usercurrentbranch',
		'subcurrency',
		'factorcurrency',
	],
	//+++++++++++++++++++++//
	data() {
		return {};
	},
	//+++++++++++++++++++++//
	template: `<div class="main-container"><div class="content">
	<div class="form">
		<div class="form__container">
			<div class="progress_bar">
				<div class="progress__nav">
					<button class="prev-btn @click='goBack()">Back</button>
					<div class="numeric-slide">
					<span class="numeric-slide__current">{{currentslide}}</span>
					/
					<span class="numeric-slide__total">{{totalslide}}</span>
					</div>
				</div>
				<div class="progress__bar" >
					<div class="progress__bar--active" :style="getBar">
					</div>
				</div>
			</div>
			<h3 class="form__subtitle">Please Choose number of stars:</h3>
			<div class="btn__list">
				<template v-for="(item, index) in btns">
						<input type="checkbox" class="hide-input"
						:key="'types'+index"
						:name="'types'+index"
						:id="item.name"
						:checked="usercurrentbranch.stars.cheked[index].isChecked"
						@click="cheked(item)"
						/>
						<label class="main__btn" :for="item.name">{{item.name}}</label>
				</template>
			</div>
		</div>
	</div>
	<div class="left-section">
	<div class="info" v-for="user in answers">
	<div class="info__container">
		<ul class="info__list">
			<li class="info__elem" v-for="(firstBranch,val,findex) in user.branchs[0]">
				<template v-if="firstBranch.isView">
						<span class="info__elem__title">{{firstBranch.title}}:</span>
						<span class="info__elem__name" v-for="(item, index) in getList(user.branchs,firstBranch.title)" @click="goTo(index,item.link,findex-1)">
							<template v-if="item.price">{{item.name}} - {{(item.price * factorcurrency).toFixed(2)}}{{subcurrency}}, </template>
							<template v-else>{{item.name}}, </template>
						</span>
				</template>
			</li>
		</ul>
		<p class="info__total info__total--last">
				<span class="info__total__title">Total</span>
				<span class="info__total__price">{{(user.totalPrice * factorcurrency).toFixed(2)}}{{subcurrency}}</span>
		</p>
	</div>
</div>
	</div>
</div></div>`,
	//+++++++++++++++++++++//
	computed: {
		getBar() {
			return {
				width: `${(this.currentslide / this.totalslide) * 100}%`,
			};
		},
	},
	methods: {
		cheked(elem) {
			this.btns.forEach(element => {
				element.isChecked = false;
			});
			elem.isChecked = true;

			this.$emit('update', { check: this.btns });
		},
		getList(braches, name) {
			let list = [];
			for (let index = 0; index < braches.length; index++) {
				for (const key in braches[index]) {
					if (braches[index][key].title === name) {
						if (braches[index][key].cheked) {
							braches[index][key].cheked.forEach(element => {
								if (element.isChecked === true) list.push(element);
							});
						} else {
							list.push(braches[index][key]);
						}
					}
				}
			}
			return list;
		},
		goTo(index, link, findex) {
			this.$emit('goto', { index: index, link: link, findex: findex });
		},
		goBack() {
			this.$emit('goback');
		},
	},
});
Vue.component('hotel', {
	//+++++++++++++++++++//
	props: [
		'currentslide',
		'totalslide',
		'btns',
		'answers',
		'usercurrentbranch',
		'currency',
		'subcurrency',
		'factorcurrency',
	],
	//+++++++++++++++++++//
	data() {
		return {
			currencyCollapse: false,
		};
	},
	//+++++++++++++++++++++++//
	template: `<div class="main-container"><div class="content">
	<div class="form">
		<div class="form__container">
			<div class="progress_bar">
				<div class="progress__nav">
					<button class="prev-btn @click='goBack()">Back</button>
					<div class="numeric-slide">
					<span class="numeric-slide__current">{{currentslide}}</span>
					/
					<span class="numeric-slide__total">{{totalslide}}</span>
					</div>
				</div>
				<div class="progress__bar" >
					<div class="progress__bar--active" :style="getBar">
					</div>
				</div>
			</div>
			<h3 class="form__subtitle">Please Choose Hotel:</h3>
			<div class="btn__list">
				<template v-for="(item, index) in btns">
						<input type="checkbox" class="hide-input"
						:key="'types'+index"
						:name="'types'+index"
						:id="item.name"
						:checked="usercurrentbranch.hotel.cheked[index].isChecked"
						@click="cheked(item)"
						/>
						<label class="main__btn main__btn--img" :for="item.name">
							<img src="img/noimg.png" alt="" />
							<div class="main__btn-descr">
								<span class="main__btn-name">{{item.name}}</span>
								<span class="main__btn-price">{{(item.priceNight * factorcurrency).toFixed(2)}}{{subcurrency}}</span>
								<span class="rating">
									<img src="img/Star.svg" alt="" v-for="index in item.stars"/>
								</span>
							</div>
						</label>
				</template>
			</div>
		</div>
	</div>
	<div class="left-section">
	<div class="info" v-for="user in answers">
	<div class="info__container">
		<ul class="info__list">
			<li class="info__elem" v-for="(firstBranch,val,findex) in user.branchs[0]">
				<template v-if="firstBranch.isView">
						<span class="info__elem__title">{{firstBranch.title}}:</span>
						<span class="info__elem__name" v-for="(item, index) in getList(user.branchs,firstBranch.title)" @click="goTo(index,item.link,findex-1)">
							<template v-if="item.price">{{item.name}} - {{(item.price * factorcurrency).toFixed(2)}}{{subcurrency}}, </template>
							<template v-else>{{item.name}}, </template>
						</span>
				</template>
			</li>
		</ul>
		<p class="info__total info__total--last">
				<span class="info__total__title">Total</span>
				<span class="info__total__price">{{(user.totalPrice * factorcurrency).toFixed(2)}}{{subcurrency}}</span>
		</p>
	</div>
</div>
	</div>
</div></div>`,
	//++++++++++++++++++++//
	computed: {
		getBar() {
			return {
				width: `${(this.currentslide / this.totalslide) * 100}%`,
			};
		},
	},
	methods: {
		//++++++++++++++++++//
		cheked(elem) {
			this.btns.forEach(element => {
				element.isChecked = false;
			});
			elem.isChecked = true;

			this.$emit('update', { check: this.btns, price: elem.priceNight });
		},
		//++++++++++++++++++//

		getList(braches, name) {
			let list = [];
			for (let index = 0; index < braches.length; index++) {
				for (const key in braches[index]) {
					if (braches[index][key].title === name) {
						if (braches[index][key].cheked) {
							braches[index][key].cheked.forEach(element => {
								if (element.isChecked === true) list.push(element);
							});
						} else {
							list.push(braches[index][key]);
						}
					}
				}
			}
			return list;
		},
		goTo(index, link, findex) {
			this.$emit('goto', { index: index, link: link, findex: findex });
		},
		goBack() {
			this.$emit('goback');
		},

		//+++++++++++++++++++//
		selectCurrency(symbol, factor) {
			this.$emit('setglobalcurrency', {
				subCurrency: symbol,
				factorCurrency: factor,
			});
			this.currencyCollapse = !this.currencyCollapse;
		},
		//+++++++++++++++++++//
	},
});

Vue.component('nights', {
	//++++++++++++++++++//
	props: [
		'currentslide',
		'totalslide',
		'procepernight',
		'nights',
		'answers',
		'usercurrentbranch',
		'subcurrency',
		'factorcurrency',
	],
	//++++++++++++++++++//
	data() {
		return {
			nightCollapse: false,
			n: this.usercurrentbranch.nights.name,
			totalPriceExtras: this.usercurrentbranch.totalPriceBranch.price,
			nightPrice: this.n * this.procepernight,
			popupShow: false,
			minNights: this.usercurrentbranch.nights.minNights,
		};
	},
	//+++++++++++++++++++++//
	template: `<div class="main-container"><div class="content">
	<div class="form">
		<div class="form__container">
			<div class="progress_bar">
				<div class="progress__nav">
					<button class="prev-btn @click='goBack()">Back</button>
					<div class="numeric-slide">
					<span class="numeric-slide__current">{{currentslide}}</span>
					/
					<span class="numeric-slide__total">{{totalslide}}</span>
					</div>
				</div>
				<div class="progress__bar" >
					<div class="progress__bar--active" :style="getBar">
					</div>
				</div>
			</div>
				<div class="nights">
						<h3 class="form__subtitle nights__subtitle">How many nights?</h3>
						<button class="nights__btn" @click="nightCollapse=!nightCollapse">
							{{n}} Nights
						</button>
						<ul class="currency__list currency__list-nights" :class="{ show: nightCollapse }">
							<li class="currency__list-item"
								v-for="index in 12"
								@click="cheked(index);nightCollapse=!nightCollapse">
								{{index}}<span v-if="index===1"> night</span><span v-else> nights</span>
							</li>
						</ul>
						
					</div>
					<button class="continue" @click="continueNights()">Continue</button>
			</div>
	</div>
	<div class="left-section">
	<div class="info" v-for="user in answers">
	<div class="info__container">
		<ul class="info__list">
			<li class="info__elem" v-for="(firstBranch,val,findex) in user.branchs[0]">
				<template v-if="firstBranch.isView">
						<span class="info__elem__title">{{firstBranch.title}}:</span>
						<span class="info__elem__name" v-for="(item, index) in getList(user.branchs,firstBranch.title)" @click="goTo(index,item.link,findex-1)">
							<template v-if="item.price">{{item.name}} - {{(item.price * factorcurrency).toFixed(2)}}{{subcurrency}}, </template>
							<template v-else>{{item.name}}, </template>
						</span>
				</template>
			</li>
		</ul>
		<p class="info__total info__total--last">
				<span class="info__total__title">Total</span>
				<span class="info__total__price">{{(user.totalPrice * factorcurrency).toFixed(2)}}{{subcurrency}}</span>
		</p>
	</div>
</div>
	</div>
</div>
	<div class="popup" v-show="popupShow">
		<div class="popup__content">
			<h2 class="popup-title">
				Please note that the minumum treatment time for this customer is:
				<span class="popup-title__span">{{minNights}} days</span>
			</h2>
			<p class="popup-desc">
				Are you sure you wish to continue with your selection:
				<span class="popup-desc__span">{{n}} nights</span> ?
			</p>
			<div class="btn__list">
				<button  class="main__btn" @click="setNights()">Yes</button>
				<button href="" class="main__btn" @click="popupShow = false">No</button>
			</div>
		</div>
	</div>
</div>`,
	//++++++++++++++++++++++++//
	computed: {
		getBar() {
			return {
				width: `${(this.currentslide / this.totalslide) * 100}%`,
			};
		},
	},
	methods: {
		cheked(index) {
			this.n = index;
		},
		continueNights() {
			this.nightPrice = this.n * this.procepernight;
			this.totalPriceExtras = this.usercurrentbranch.totalPriceBranch.price;
			this.totalPriceExtras += this.n * this.procepernight;

			if (this.n < this.minNights) {
				this.popupShow = true;
			} else {
				this.$emit('update', {
					check: this.n,
					totalPlus: this.totalPriceExtras,
					nightPrice: this.nightPrice,
				});
			}
		},
		setNights() {
			this.$emit('update', {
				check: this.n,
				totalPlus: this.totalPriceExtras,
				nightPrice: this.nightPrice,
			});
		},
		getList(braches, name) {
			let list = [];
			for (let index = 0; index < braches.length; index++) {
				for (const key in braches[index]) {
					if (braches[index][key].title === name) {
						if (braches[index][key].cheked) {
							braches[index][key].cheked.forEach(element => {
								if (element.isChecked === true) list.push(element);
							});
						} else {
							list.push(braches[index][key]);
						}
					}
				}
			}
			return list;
		},
		goTo(index, link, findex) {
			this.$emit('goto', { index: index, link: link, findex: findex });
		},
		goBack() {
			this.$emit('goback');
		},
	},
});
Vue.component('anotherroom', {
	//+++++++++++++++++++++++//
	props: [
		'currentslide',
		'totalslide',
		'answers',
		'usercurrentbranch',
		'subcurrency',
		'factorcurrency',
	],
	//+++++++++++++++++++++++//
	data() {
		return {};
	},
	//+++++++++++++++++//
	template: `<div class="main-container"><div class="content">
	<div class="form">
		<div class="form__container">
			<div class="progress_bar">
				<div class="progress__nav">
					<button class="prev-btn @click='goBack()">Back</button>
					<div class="numeric-slide">
					<span class="numeric-slide__current">{{currentslide}}</span>
					/
					<span class="numeric-slide__total">{{totalslide}}</span>
					</div>
				</div>
				<div class="progress__bar" >
					<div class="progress__bar--active" :style="getBar">
					</div>
				</div>
			</div>
			<h3 class="form__subtitle">Need Another Room?</h3>
			<div class="btn__list">
						<button class="main__btn main__btn--big" @click="selectYes()">
							Yes
						</button>
						<button class="main__btn main__btn--big" @click="selectNo()">
							No
						</button>
			</div>
		</div>
	</div>
	<div class="left-section">
		<div class="info" v-for="user in answers">
			<div class="info__container">
				<ul class="info__list">
					<li class="info__elem" v-for="(firstBranch,val,findex) in user.branchs[0]">
						<template v-if="firstBranch.isView">
								<span class="info__elem__title">{{firstBranch.title}}:</span>
								<span class="info__elem__name" v-for="(item, index) in getList(user.branchs,firstBranch.title)" @click="goTo(index,item.link,findex-1)">
									<template v-if="item.price">{{item.name}} - {{(item.price * factorcurrency).toFixed(2)}}{{subcurrency}}, </template>
									<template v-else>{{item.name}}, </template>
								</span>
						</template>
					</li>
				</ul>
				<p class="info__total info__total--last">
						<span class="info__total__title">Total</span>
						<span class="info__total__price">{{(user.totalPrice * factorcurrency).toFixed(2)}}{{subcurrency}}</span>
				</p>
			</div>
		</div>
	</div>
</div></div>`,
	//++++++++++++++++++++++++//
	computed: {
		getBar() {
			return {
				width: `${(this.currentslide / this.totalslide) * 100}%`,
			};
		},
	},
	methods: {
		selectYes() {
			this.$emit('selectedyes');
		},
		selectNo() {
			this.$emit('selectedno');
		},
		getList(braches, name) {
			let list = [];
			for (let index = 0; index < braches.length; index++) {
				for (const key in braches[index]) {
					if (braches[index][key].title === name) {
						if (braches[index][key].cheked) {
							braches[index][key].cheked.forEach(element => {
								if (element.isChecked === true) list.push(element);
							});
						} else {
							list.push(braches[index][key]);
						}
					}
				}
			}
			return list;
		},
		goTo(index, link, findex) {
			this.$emit('goto', { index: index, link: link, findex: findex });
		},
		goBack() {
			this.$emit('goback');
		},
	},
});
Vue.component('transportation', {
	//+++++++++++++++++++++++//
	props: [
		'currentslide',
		'totalslide',
		'answers',
		'usercurrentbranch',
		'subcurrency',
		'factorcurrency',
	],
	//+++++++++++++++++++++++//
	data() {
		return {};
	},
	//+++++++++++++++++//
	template: `<div class="main-container"><div class="content">
	<div class="form">
		<div class="form__container">
			<div class="progress_bar">
				<div class="progress__nav">
					<button class="prev-btn @click='goBack()">Back</button>
					<div class="numeric-slide">
					<span class="numeric-slide__current">{{currentslide}}</span>
					/
					<span class="numeric-slide__total">{{totalslide}}</span>
					</div>
				</div>
				<div class="progress__bar" >
					<div class="progress__bar--active" :style="getBar">
					</div>
				</div>
			</div>
			<h3 class="form__subtitle">Transportation?</h3>
			<div class="btn__list">
						<button class="main__btn main__btn--big" @click="selectYes()">
							Yes
						</button>
						<button class="main__btn main__btn--big" @click="selectNo()">
							No
						</button>
			</div>
		</div>
	</div>
	<div class="left-section">
		<div class="info" v-for="user in answers">
			<div class="info__container">
				<ul class="info__list">
					<li class="info__elem" v-for="(firstBranch,val,findex) in user.branchs[0]">
						<template v-if="firstBranch.isView">
								<span class="info__elem__title">{{firstBranch.title}}:</span>
								<span class="info__elem__name" v-for="(item, index) in getList(user.branchs,firstBranch.title)" @click="goTo(index,item.link,findex-1)">
									<template v-if="item.price">{{item.name}} - {{(item.price * factorcurrency).toFixed(2)}}{{subcurrency}}, </template>
									<template v-else>{{item.name}}, </template>
								</span>
						</template>
					</li>
				</ul>
				<p class="info__total info__total--last">
						<span class="info__total__title">Total</span>
						<span class="info__total__price">{{(user.totalPrice * factorcurrency).toFixed(2)}}{{subcurrency}}</span>
				</p>
			</div>
		</div>
	</div>
</div></div>`,
	//+++++++++++++++++++++++//
	computed: {
		getBar() {
			return {
				width: `${(this.currentslide / this.totalslide) * 100}%`,
			};
		},
	},
	methods: {
		selectYes() {
			this.$emit('selectedyes');
		},
		selectNo() {
			this.$emit('selectedno');
		},
		getList(braches, name) {
			let list = [];
			for (let index = 0; index < braches.length; index++) {
				for (const key in braches[index]) {
					if (braches[index][key].title === name) {
						if (braches[index][key].cheked) {
							braches[index][key].cheked.forEach(element => {
								if (element.isChecked === true) list.push(element);
							});
						} else {
							list.push(braches[index][key]);
						}
					}
				}
			}
			return list;
		},
		goTo(index, link, findex) {
			this.$emit('goto', { index: index, link: link, findex: findex });
		},
		goBack() {
			this.$emit('goback');
		},
	},
});
Vue.component('addtransportation', {
	//++++++++++++++++++++++//
	props: [
		'currentslide',
		'totalslide',
		'btns',
		'answers',
		'usercurrentbranch',
		'currency',
		'subcurrency',
		'factorcurrency',
	],
	//++++++++++++++++++++++//
	data() {
		return {
			currencyCollapse: false,
			totalPriceExtras: this.usercurrentbranch.totalPriceBranch.price,
		};
	},
	//++++++++++++++++++++++//
	template: `<div class="main-container"><div class="content">
	<div class="form">
		<div class="form__container">
			<div class="progress_bar">
				<div class="progress__nav">
					<button class="prev-btn @click='goBack()">Back</button>
					<div class="numeric-slide">
					<span class="numeric-slide__current">{{currentslide}}</span>
					/
					<span class="numeric-slide__total">{{totalslide}}</span>
					</div>
				</div>
				<div class="progress__bar" >
					<div class="progress__bar--active" :style="getBar">
					</div>
				</div>
			</div>
			<h3 class="form__subtitle">Transportation?</h3>
			<div class="btn__list">
				<template v-for="(item, index) in btns">
						<input type="checkbox" class="hide-input"
						:key="'types'+index"
						:name="'types'+index"
						:id="item.name"
						:checked="usercurrentbranch.addtransportation.cheked[index].isChecked"
						@click="cheked(item)"
						/>
						<label class="main__btn main__btn--big" :for="item.name"><span class="main__btn-name">{{item.name}}</span>
						<span class="main__btn-price">{{(item.price * factorcurrency).toFixed(2)}}{{subcurrency}}</span></label>
				</template>
			</div>
		</div>
	</div>
	<div class="left-section">
			<div class="currency" @click="currencyCollapse=!currencyCollapse">
				<p>Currency</p>
				<button class="currency__btn">{{subcurrency}}</button>
			</div>
			<ul class="currency__list" :class="{ show: currencyCollapse }">
				<li
				v-for="(item, index) in currency"
					class="currency__list-item"
					@click="selectCurrency(item.symbol,item.factor)"
				>
					<span>{{item.name}}</span>
					<span>{{item.symbol}}</span>
				</li>
			</ul>
			<div class="info" v-for="user in answers">
			<div class="info__container">
				<ul class="info__list">
					<li class="info__elem" v-for="(firstBranch,val,findex) in user.branchs[0]">
						<template v-if="firstBranch.isView">
								<span class="info__elem__title">{{firstBranch.title}}:</span>
								<span class="info__elem__name" v-for="(item, index) in getList(user.branchs,firstBranch.title)" @click="goTo(index,item.link,findex-1)">
									<template v-if="item.price">{{item.name}} - {{(item.price * factorcurrency).toFixed(2)}}{{subcurrency}}, </template>
									<template v-else>{{item.name}}, </template>
								</span>
						</template>
					</li>
				</ul>
				<p class="info__total info__total--last">
						<span class="info__total__title">Total</span>
						<span class="info__total__price">{{(user.totalPrice * factorcurrency).toFixed(2)}}{{subcurrency}}</span>
				</p>
			</div>
		</div>
	</div>
</div></div>`,
	//++++++++++++++++++++//
	computed: {
		getBar() {
			return {
				width: `${(this.currentslide / this.totalslide) * 100}%`,
			};
		},
	},
	//--------------------//
	// watch: {
	// 	subCurrency(val) {
	// 		this.btns.forEach(element => {
	// 			let calc = element.price * this.factorCurrency;
	// 			element.calcPrice = calc.toFixed(2);
	// 		});
	// 	},
	// },
	//--------------------//
	methods: {
		cheked(elem) {
			if (elem.isChecked) {
				elem.isChecked = false;
				this.totalPriceExtras -= elem.price;
			} else {
				elem.isChecked = true;
				this.totalPriceExtras += elem.price;
			}

			this.$emit('update', { check: this.btns, totalPlus: this.totalPriceExtras });
		},
		getList(braches, name) {
			let list = [];
			for (let index = 0; index < braches.length; index++) {
				for (const key in braches[index]) {
					if (braches[index][key].title === name) {
						if (braches[index][key].cheked) {
							braches[index][key].cheked.forEach(element => {
								if (element.isChecked === true) list.push(element);
							});
						} else {
							list.push(braches[index][key]);
						}
					}
				}
			}
			return list;
		},
		goTo(index, link, findex) {
			this.$emit('goto', { index: index, link: link, findex: findex });
		},
		goBack() {
			this.$emit('goback');
		},
		//+++++++++++++++++++//
		selectCurrency(symbol, factor) {
			this.$emit('setglobalcurrency', {
				subCurrency: symbol,
				factorCurrency: factor,
			});
			this.currencyCollapse = !this.currencyCollapse;
		},
		//+++++++++++++++++++//
	},
});
Vue.component('anything', {
	//++++++++++++++++++//
	props: [
		'currentslide',
		'totalslide',
		'btns',
		'answers',
		'usercurrentbranch',
		'subcurrency',
		'factorcurrency',
	],
	//++++++++++++++++++//
	data() {
		return {};
	},
	//+++++++++++++++++//
	template: `<div class="main-container"><div class="content">
	<div class="form">
		<div class="form__container">
			<div class="progress_bar">
				<div class="progress__nav">
					<button class="prev-btn" @click='goBack()'>Back</button>
					<div class="numeric-slide">
						<span class="numeric-slide__current">{{currentslide}}</span>
						/
						<span class="numeric-slide__total">{{totalslide}}</span>
					</div>
				</div>
				<div class="progress__bar" >
					<div class="progress__bar--active" :style="getBar">
					</div>
				</div>
			</div>
			<h3 class="form__subtitle">Anything else?</h3>
			<div class="btn__list">
				<template v-for="(item, index) in btns">
						<input type="checkbox" class="hide-input"
						:key="'types'+index"
						:name="'types'+index"
						:id="item.name"
						:checked="usercurrentbranch.anything.cheked[index].isChecked"
						@click="cheked(item)"
						/>
						<label class="main__btn main__btn--big" :for="item.name">{{item.name}}</label>
				</template>
			</div>
			<button class="next-btn" @click="extrasGo()">No, Thanks</button>
		</div>
	</div>
	<div class="left-section">
	<div class="info" v-for="user in answers">
		<div class="info__container">
			<ul class="info__list">
				<li class="info__elem" v-for="(firstBranch,val,findex) in user.branchs[0]">
					<template v-if="firstBranch.isView">
							<span class="info__elem__title">{{firstBranch.title}}:</span>
							<span class="info__elem__name" v-for="(item, index) in getList(user.branchs,firstBranch.title)" @click="goTo(index,item.link,findex-1)">
								<template v-if="item.price">{{item.name}} - {{(item.price * factorcurrency).toFixed(2)}}{{subcurrency}}, </template>
								<template v-else>{{item.name}}, </template>
							</span>
					</template>
				</li>
			</ul>
			<p class="info__total info__total--last">
					<span class="info__total__title">Total</span>
					<span class="info__total__price">{{(user.totalPrice * factorcurrency).toFixed(2)}}{{subcurrency}}</span>
			</p>
		</div>
</div>
	</div>
	</div>
</div></div>`,
	//+++++++++++++++++++++++//
	computed: {
		getBar() {
			return {
				width: `${(this.currentslide / this.totalslide) * 100}%`,
			};
		},
	},
	methods: {
		cheked(elem) {
			if (elem.isChecked) {
				elem.isChecked = false;
			} else {
				elem.isChecked = true;
			}
			this.$emit('update', { check: this.btns });
		},
		extrasGo() {
			this.$emit('update', { check: this.btns });
		},
		getList(braches, name) {
			let list = [];
			for (let index = 0; index < braches.length; index++) {
				for (const key in braches[index]) {
					if (braches[index][key].title === name) {
						if (braches[index][key].cheked) {
							braches[index][key].cheked.forEach(element => {
								if (element.isChecked === true) list.push(element);
							});
						} else {
							list.push(braches[index][key]);
						}
					}
				}
			}
			return list;
		},
		goTo(index, link, findex) {
			this.$emit('goto', { index: index, link: link, findex: findex });
		},
		goBack() {
			this.$emit('goback');
		},
	},
});
Vue.component('end', {
	//++++++++++++++++//
	props: ['answers', 'usercurrentbranch', 'subcurrency', 'factorcurrency'],
	//++++++++++++++++//
	data() {
		return {};
	},
	template: `<div class="main-container"><div class="content">
	<div class="form">
		<div class="form-main__container">
			<h2 class="form__title form__title--last">Your total is:</h2>
			<div class="left-section">
					<div class="info" v-for="user in answers">
					<div class="info__container">
						<ul class="info__list">
							<li class="info__elem" v-for="(firstBranch,val,findex) in user.branchs[0]">
								<template v-if="firstBranch.isView">
										<span class="info__elem__title">{{firstBranch.title}}:</span>
										<span class="info__elem__name" v-for="(item, index) in getList(user.branchs,firstBranch.title)" @click="goTo(index,item.link,findex-1)">
											<template v-if="item.price">{{item.name}} - {{(item.price * factorcurrency).toFixed(2)}}{{subcurrency}}, </template>
											<template v-else>{{item.name}}, </template>
										</span>
								</template>
							</li>
						</ul>
						<p class="info__total info__total--last">
								<span class="info__total__title">Total</span>
								<span class="info__total__price">{{(user.totalPrice * factorcurrency).toFixed(2)}}{{subcurrency}}</span>
						</p>
					</div>
				</div>
			</div>
			<div class="btn__list">
				<a class="main__btn main__btn--small" @click="generatePdf()"> Generate PDF </a>
			</div>
		</div>
	</div>
</div></div>`,
	//++++++++++++++++++++//

	methods: {
		getList(braches, name) {
			let list = [];
			for (let index = 0; index < braches.length; index++) {
				for (const key in braches[index]) {
					if (braches[index][key].title === name) {
						if (braches[index][key].cheked) {
							braches[index][key].cheked.forEach(element => {
								if (element.isChecked === true) list.push(element);
							});
						} else {
							list.push(braches[index][key]);
						}
					}
				}
			}
			return list;
		},
		generatePdf() {
			this.$emit('generatepdf');
		},
		goTo(index, link, findex) {
			this.$emit('goto', { index: index, link: link, findex: findex });
		},
	},
});

const app = new Vue({
	el: '#app',
	data: {
		allQuestions: [
			'types',
			'countries',
			'clinics',
			'treamentstype',
			'treamentssub',
			'extras',
			'addtreatment',
			'castomertreatment',
			'accomodation',
			'roomtype',
			'stars',
			'hotel',
			'nights',
			'anotherroom',
			'transportation',
			'addtransportation',
			'anything',
			'end',
		],
		renderQuestion: 0,
		renderAnswer: 'types',
		currentUser: 'mainUser',
		currentBranch: 0,

		types: [],
		countries: [],
		clinics: [],
		treamentstype: [],
		treamentssub: [],
		extras: [],
		roomtype: [],
		stars: [],
		hotel: [],
		addtransportation: [],
		anything: [],

		//++++++++//
		subCurrency: '$',
		factorCurrency: 1,
		//++++++++//

		nightCollapse: false,
		nights: 4,
		currency: [
			{
				name: 'Euro',
				symbol: '€',
				factor: 0.93,
			},
			{
				name: 'Dollar',
				symbol: '$',
				factor: 1,
			},
		],
		answers: {
			mainUser: {
				totalPrice: 0,
				branchs: [
					{
						totalPriceBranch: {
							title: 'total branch',
							isView: false,
							price: 0,
						},
					},
				],
			},
		},
	},
	mounted() {
		this.types = [
			{
				id: 1,
				name: 'Hair',
				link: 'types',
				isChecked: false,
			},
			{
				id: 2,
				name: 'Face',
				link: 'types',
				isChecked: false,
			},
			{
				id: 3,
				name: 'Plastic',
				link: 'types',
				isChecked: false,
			},
			{
				id: 4,
				name: 'Dental',
				link: 'types',
				isChecked: false,
			},
		];

		this.$set(this.userCurrentBranch, 'types', {
			link: 'types',
			title: 'Type',
			isView: true,
			cheked: this.types,
		});
	},
	methods: {
		typesUpdate(data) {
			this.$set(this.userCurrentBranch.types, 'cheked', data.check);
			setTimeout(() => {
				this.countries = [
					{
						id: 1,
						name: 'Ukraine',
						link: 'countries',
						isChecked: false,
					},
					{
						id: 2,
						name: 'France',
						link: 'countries',
						isChecked: false,
					},
					{
						id: 3,
						name: 'Itali',
						link: 'countries',
						isChecked: false,
					},
				];
				this.$set(this.userCurrentBranch, 'countries', {
					name: '',
					link: 'countries',
					title: 'Countries',
					isView: true,
					cheked: this.countries,
				});
			}, 100);
			this.renderQuestion++;
		},
		countriesUpdate(data) {
			this.$set(this.userCurrentBranch.countries, 'cheked', data.check);
			setTimeout(() => {
				this.clinics = [
					{
						id: 1,
						name: 'Clinic A',
						link: 'clinics',
						isChecked: false,
					},
					{
						id: 2,
						name: 'Clinic B',
						link: 'clinics',
						isChecked: false,
					},
					{
						id: 3,
						name: 'Clinic X',
						link: 'clinics',
						isChecked: false,
					},
				];
				this.$set(this.userCurrentBranch, 'clinics', {
					link: 'clinics',
					title: 'Clinic',
					isView: true,
					cheked: this.clinics,
				});
			}, 100);
			this.renderQuestion++;
		},
		clinicsUpdate(data) {
			this.$set(this.userCurrentBranch.clinics, 'cheked', data.check);
			setTimeout(() => {
				this.treamentstype = [
					{
						id: 1,
						name: 'Hair Transplant',
						link: 'treamentstype',
						isChecked: false,
					},
					{
						id: 2,
						name: 'Beard & Mustache Trasnplant',
						link: 'treamentstype',
						isChecked: false,
					},
					{
						id: 3,
						name: 'Eyebrows Transplant',
						link: 'treamentstype',
						isChecked: false,
					},
				];
				this.$set(this.userCurrentBranch, 'treamentstype', {
					link: 'treaments',
					title: 'Treaments',
					isView: true,
					cheked: this.treamentstype,
				});
			}, 100);
			this.renderQuestion++;
		},
		treamentstypeUpdate(data) {
			this.$set(this.userCurrentBranch.treamentstype, 'cheked', data.check);
			setTimeout(() => {
				this.treamentssub = [
					{
						id: 1,
						name: 'FUE - Team',
						price: 1050,
						calcPrice: 1050,
						link: 'treamentssub',
						isChecked: false,
					},
					{
						id: 2,
						name: 'DHI - Team',
						price: 1230,
						calcPrice: 1230,
						link: 'treamentssub',
						isChecked: false,
					},
				];
				this.$set(this.userCurrentBranch, 'treamentssub', {
					link: 'treamentssub',
					title: 'Treaments Sub',
					isView: true,
					cheked: this.treamentssub,
				});
			}, 100);
			this.renderQuestion++;
		},
		treamentssubUpdate(data) {
			this.$set(this.userCurrentBranch.treamentssub, 'cheked', data.check);
			this.$set(this.userCurrentBranch.totalPriceBranch, 'price', data.totalPlus);

			this.updateTotalPrice();

			setTimeout(() => {
				this.extras = [
					{
						id: 1,
						name: 'Dr. channel Opening',
						price: 300,
						calcPrice: 300,
						link: 'extras',
						isChecked: false,
					},
					{
						id: 2,
						name: 'Beard Hair Extraction',
						price: 330,
						calcPrice: 330,
						link: 'extras',
						isChecked: false,
					},
					{
						id: 2,
						name: 'Sedation',
						price: 200,
						calcPrice: 200,
						link: 'extras',
						isChecked: false,
					},
				];
				this.$set(this.userCurrentBranch, 'extras', {
					link: 'extras',
					title: 'Extras',
					isView: true,
					cheked: this.extras,
				});
			}, 100);
			this.renderQuestion++;
		},
		extrasUpdate(data) {
			this.$set(this.userCurrentBranch.extras, 'cheked', data.check);
			this.$set(this.userCurrentBranch.totalPriceBranch, 'price', data.totalPlus);
			this.updateTotalPrice();
			setTimeout(() => {
				this.$set(this.userCurrentBranch, 'accomodation', {
					title: 'Accomodation',
					isView: false,
					cheked: '',
				});
			}, 100);
			this.renderQuestion = this.allQuestions.indexOf('accomodation');
		},

		addtreatmentYes() {
			console.log('addtreatmentYes');
			this.$set(this.userCurrentBranch.addtreatment, 'cheked', 'Yes');
		},
		addtreatmentNo() {
			console.log('addtreatmentNo');
			this.$set(this.userCurrentBranch.addtreatment, 'cheked', 'No');

			setTimeout(() => {
				this.$set(this.userCurrentBranch, 'accomodation', {
					title: 'Accomodation',
					isView: false,
					cheked: '',
				});
			}, 100);
			this.renderQuestion = this.allQuestions.indexOf('accomodation');
		},

		castomertreatmentYes() {
			console.log('castomertreatmentYes');
		},
		castomertreatmentNo() {
			console.log('castomertreatmentNo');
		},

		accomodationYes() {
			this.$set(this.userCurrentBranch.accomodation, 'cheked', 'Yes');
			setTimeout(() => {
				//++++++++++++++++//
				this.roomtype = [
					{
						id: 1,
						name: 'Single',
						link: 'roomtype',
						isChecked: false,
					},
					{
						id: 2,
						name: 'Double',
						link: 'roomtype',
						isChecked: false,
					},
					{
						id: 2,
						name: 'Triple',
						link: 'roomtype',
						isChecked: false,
					},
					{
						id: 2,
						name: 'Other',
						link: 'roomtype',
						isChecked: false,
					},
				];
				//+++++++++++++++++++++//
				this.$set(this.userCurrentBranch, 'roomtype', {
					link: 'roomtype',
					title: 'Room Type',
					isView: true,
					cheked: this.roomtype,
				});
			}, 100);
			this.renderQuestion = this.allQuestions.indexOf('roomtype');
		},
		accomodationNo() {
			console.log('castomertreatmentNo');
			this.$set(this.userCurrentBranch.accomodation, 'cheked', 'No');
			setTimeout(() => {
				this.$set(this.userCurrentBranch, 'transportation', {
					// title: 'Transportation',
					isView: false,
					cheked: '',
				});
			}, 100);
			this.renderQuestion = this.allQuestions.indexOf('transportation');
		},

		roomtypeUpdate(data) {
			this.$set(this.userCurrentBranch.roomtype, 'cheked', data.check);
			setTimeout(() => {
				this.stars = [
					{
						id: 1,
						name: '4 Stars',
						link: 'stars',
						isChecked: false,
					},
					{
						id: 2,
						name: '5 Stars',
						link: 'stars',
						isChecked: false,
					},
					{
						id: 2,
						name: 'See All',
						link: 'stars',
						isChecked: false,
					},
				];
				this.$set(this.userCurrentBranch, 'stars', {
					link: 'stars',
					title: 'stars',
					isView: false,
					cheked: this.stars,
				});

				this.renderQuestion = this.allQuestions.indexOf('stars');
			}, 100);
		},

		starsUpdate(data) {
			this.$set(this.userCurrentBranch.stars, 'cheked', data.check);
			setTimeout(() => {
				this.hotel = [
					{
						id: 1,
						name: 'Hotel A',
						stars: 3,
						priceNight: 120,
						link: 'hotel',
						isChecked: false,
					},
					{
						id: 2,
						name: 'Hotel B',
						stars: 3,
						priceNight: 150,
						link: 'hotel',
						isChecked: false,
					},
					{
						id: 2,
						name: 'Hotel C',
						stars: 3,
						priceNight: 220,
						link: 'hotel',
						isChecked: false,
					},
					{
						id: 2,
						name: 'Hotel D',
						stars: 3,
						priceNight: 200,
						link: 'hotel',
						isChecked: false,
					},
				];
				this.$set(this.userCurrentBranch, 'hotel', {
					link: 'hotel',
					title: 'Hotel',
					isView: true,
					cheked: this.hotel,
				});

				this.renderQuestion = this.allQuestions.indexOf('hotel');
			}, 100);
		},

		hotelUpdate(data) {
			this.$set(this.userCurrentBranch.hotel, 'cheked', data.check);
			this.$set(this.userCurrentBranch.hotel, 'priceOne', data.price);
			this.$set(this.userCurrentBranch, 'nights', {
				link: 'nights',
				title: 'Nights',
				isView: true,
				name: 4,
				minNights: 7,
				price: this.userCurrentBranch.hotel.priceOne * 4,
			});
			this.renderQuestion = this.allQuestions.indexOf('nights');
		},

		nightsUpdate(data) {
			this.$set(this.userCurrentBranch.nights, 'name', data.check);
			this.$set(this.userCurrentBranch.nights, 'price', data.nightPrice);
			this.$set(this.userCurrentBranch.totalPriceBranch, 'price', data.totalPlus);
			this.updateTotalPrice();
			this.$set(this.userCurrentBranch, 'anotherroom', {
				link: 'anotherroom',
				title: 'Another Room',
				isView: false,
				nights: 4,
			});
			this.renderQuestion = this.allQuestions.indexOf('anotherroom');
		},

		anotherroomYes() {
			this.$set(this.userCurrentBranch.anotherroom, 'cheked', 'Yes');
			setTimeout(() => {
				this.$set(this.userCurrentBranch, 'transportation', {
					// title: 'Transportation',
					isView: false,
					cheked: '',
				});
			}, 100);

			delete this.userCurrentBranch.stars;
			delete this.userCurrentBranch.hotel;
			delete this.userCurrentBranch.nights;
			delete this.userCurrentBranch.anotherroom;
			this.renderQuestion = this.allQuestions.indexOf('roomtype');
		},
		anotherroomNo() {
			console.log('castomertreatmentNo');
			this.$set(this.userCurrentBranch.anotherroom, 'cheked', 'No');
			setTimeout(() => {
				this.$set(this.userCurrentBranch, 'transportation', {
					// title: 'Transportation',
					isView: false,
					cheked: '',
				});
			}, 100);
			this.renderQuestion = this.allQuestions.indexOf('transportation');
		},
		transportationYes() {
			console.log('castomertreatmentYes');
			this.$set(this.userCurrentBranch.transportation, 'cheked', 'Yes');
			setTimeout(() => {
				this.addtransportation = [
					{
						id: 1,
						name: 'Transportation Package',
						price: 230,
						calcPrice: 230,
						link: 'addtransportation',
						isChecked: false,
					},
					{
						id: 2,
						name: 'Single Ride - To/From Airport',
						price: 60,
						calcPrice: 60,
						link: 'addtransportation',
						isChecked: false,
					},
					{
						id: 2,
						name: 'Single Ride - In City',
						price: 60,
						calcPrice: 60,
						link: 'addtransportation',
						isChecked: false,
					},
				];
				this.$set(this.userCurrentBranch, 'addtransportation', {
					link: 'addtransportation',
					title: 'Transportation',
					isView: true,
					cheked: this.addtransportation,
				});
			}, 100);
			this.renderQuestion = this.allQuestions.indexOf('addtransportation');
		},
		transportationNo() {
			console.log('castomertreatmentNo');
			this.$set(this.userCurrentBranch.transportation, 'cheked', 'No');
			setTimeout(() => {
				this.anything = [
					{
						id: 1,
						name: 'SPA',
						link: 'anything',
						isChecked: false,
					},
					{
						id: 2,
						name: 'Wellness',
						link: 'anything',
						isChecked: false,
					},
					{
						id: 2,
						name: 'Products',
						link: 'anything',
						isChecked: false,
					},
					{
						id: 2,
						name: 'Aesthetics',
						link: 'anything',
						isChecked: false,
					},
				];
				this.$set(this.userCurrentBranch, 'anything', {
					link: 'anything',
					title: 'Anything',
					isView: false,
					cheked: this.anything,
				});
			}, 100);
			this.renderQuestion = this.allQuestions.indexOf('anything');
		},

		addtransportationUpdate(data) {
			this.$set(this.userCurrentBranch.addtransportation, 'cheked', data.check);
			this.$set(this.userCurrentBranch.totalPriceBranch, 'price', data.totalPlus);

			this.updateTotalPrice();

			setTimeout(() => {
				this.anything = [
					{
						id: 1,
						name: 'SPA',
						link: 'anything',
						isChecked: false,
					},
					{
						id: 2,
						name: 'Wellness',
						link: 'anything',
						isChecked: false,
					},
					{
						id: 2,
						name: 'Products',
						link: 'anything',
						isChecked: false,
					},
					{
						id: 2,
						name: 'Aesthetics',
						link: 'anything',
						isChecked: false,
					},
				];
				this.$set(this.userCurrentBranch, 'anything', {
					link: 'anything',
					title: 'Anything',
					isView: false,
					cheked: this.anything,
				});
			}, 100);
			this.renderQuestion = this.allQuestions.indexOf('anything');
		},

		anythingUpdate(data) {
			this.$set(this.userCurrentBranch.anything, 'cheked', data.check);
			this.renderQuestion = this.allQuestions.indexOf('end');
		},

		//+++++++++++++++++//
		setGlobalCurrency({ subCurrency, factorCurrency }) {
			this.subCurrency = subCurrency;
			this.factorCurrency = factorCurrency;
		},
		//+++++++++++++++++//

		updateTotalPrice() {
			let total = 0;
			this.answers[this.currentUser].branchs.forEach(element => {
				total += element.totalPriceBranch.price;
			});

			this.answers[this.currentUser].totalPrice = total;
		},

		goTo({ index, link, findex }) {
			this.currentBranch = index;
			this.renderQuestion = this.allQuestions.indexOf(link);
		},
		goBack() {
			this.renderQuestion--;
		},

		generatePdf() {
			console.log('generatePdf');
		},
	},
	computed: {
		userCurrentBranch() {
			return this.answers[this.currentUser].branchs[this.currentBranch];
		},
		totalSlide() {
			return this.allQuestions.length;
		},
	},

	watch: {
		renderQuestion(val) {
			this.renderAnswer = this.allQuestions[val];
		},
	},
});
