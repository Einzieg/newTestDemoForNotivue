<template>
	<div class="home">
		<h1>Welcome to the Home page</h1>
	</div>

	<div class="login">
		<button @click="toLogin">去登录</button>
	</div>
	<div class="logout">
		<button @click="logout">登出</button>
	</div>
	<div class="test1">
		<button @click="test1">测试1</button>
	</div>
	<div class="test2">
		<button @click="test2">测试2</button>
	</div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import { push } from "../main";
const router = useRouter();

const logout = () => {
	axios.get("auth/logout").then(() => {
		localStorage.removeItem("EinziegCloud_USER");
		router.push({ path: "/login" });
	});
};

const toLogin = () => {
	router.push({ path: "/login" });
};
const test1 = () => {
	push.success({
		title: "成功",
		message: "这是一条成功的提示消息",
	})
};
async function test2(){
	const notification = push.promise("上传中");
	await new Promise((resolve, reject) => Math.random() > 0.5 ? resolve : reject, 2000)
	notification.resolve("上传结束")
}
</script>

<style scoped></style>
