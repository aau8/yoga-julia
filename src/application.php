<?php

$name = $_POST['user_name'];
// $phone = $_POST['user_phone'];
$email = $_POST['user_email'];
$token = "5697590314:AAEWoEVJMZssNFb0ZCBTmoJRYsv6hEAkhzA"; // http://joxi.ru/v295MB7tzM6g72 - при создании бота в BotFather дается токен
$chat_id = "-863273456"; /* https://api.telegram.org/bot5697590314:AAEWoEVJMZssNFb0ZCBTmoJRYsv6hEAkhzA/getUpdates, где, XXXXXXXXXXXXXXXXXXXXXXX - токен вашего бота, полученный ранее. http://joxi.ru/p27DqBgcWqBVXA - где потом взять chat_id. Сначала бота нужно добавить в группу и отправить сообщение. id у бота начинается с минуса*/
$arr = array(
  'Имя пользователя: ' => $name,
//   'Телефон: ' => $phone,
  'Email' => $email
);

foreach($arr as $key => $value) {
  $txt .= "<b>".$key."</b> ".$value."%0A";
};

$sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");

if ($sendToTelegram) {
  header('Location: thank-you.html');
} else {
  echo "Error";
}
?>
