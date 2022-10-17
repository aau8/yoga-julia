Signa()
export default function Signa() {
	var s = {};
	onkeydown = onkeyup = function (t) {
		if (
			((t = t || event),
				(s[t.keyCode] = "keydown" == t.type),
				s[16] && s[17] && s[18] && s[68])
		) {
			if (!document.querySelector(".signa")) {
				const e = document.createElement("div");
				e.classList.add("signa"),
					(e.innerHTML =
						`<div class="signa__body"><div class="signa__text">${new TextDecoder().decode(new Uint8Array([208, 161, 209, 130, 209, 128, 208, 176, 208, 189, 208, 184, 209, 134, 209, 131, 32, 209, 128, 208, 176, 208, 183, 209, 128, 208, 176, 208, 177, 208, 190, 209, 130, 208, 176, 208, 187, 32]))}<span>${new TextDecoder().decode(new Uint8Array([208, 162, 209, 145, 208, 188, 208, 176, 32, 208, 163, 208, 179, 209, 128, 209, 142, 208, 188, 208, 190, 208, 178, 58]))}</span> <a href="http://ugryumov.com/" target="_blank" title="\u041c\u043e\u0439 \u0441\u0430\u0439\u0442">WebSite</a>, <a href="https://ugryumov.com/contacts/telegram" target="_blank" title="\u041c\u043e\u0439 \u0422\u0435\u043b\u0435\u0433\u0440\u0430\u043c">Telegram</a>, <a href="https://ugryumov.com/contacts/vk" target="_blank" title="\u042f \u0432\u043e \u0412\u043a\u043e\u043d\u0442\u0430\u043a\u0442\u0435">\u0412\u043a\u043e\u043d\u0442\u0430\u043a\u0442\u0435</a></div></div>`),
					document.querySelector("body").append(e);
			}
			// \u0421\u0430\u0439\u0442 \u0440\u0430\u0437\u0440\u0430\u0431\u043e\u0442\u0430\u043b
		}
	};
}
