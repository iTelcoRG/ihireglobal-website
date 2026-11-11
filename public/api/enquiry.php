<?php
declare(strict_types=1);
// cPanel PHP endpoint. Only the fixed enquiry alias can receive messages.
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');
header('X-Robots-Tag: noindex');
function reply(int $code, array $body): never {
    http_response_code($code);
    echo json_encode($body, JSON_UNESCAPED_SLASHES);
    exit;
}
function fail(int $code, string $message): never { reply($code, ['ok'=>false, 'message'=>$message]); }

function enquiry_html(array $fields, string $reference, bool $isChat, string $received): string {
    $escape = fn(string $value): string => htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
    $title = $isChat ? 'New chat request' : 'New staffing enquiry';
    $intro = $isChat ? 'Someone would like to start a conversation.' : 'A business has shared its staffing requirements.';
    $sections = [
        'Contact details' => ['contact_name'=>'Name','company_name'=>'Company','work_email'=>'Email','phone'=>'Phone','country'=>'Country']
    ];
    if ($isChat) {
        $sections['Their message'] = ['message'=>'Message'];
    } else {
        $sections['The role'] = ['role_title'=>'Role / job title','headcount'=>'People required','responsibilities'=>'Main responsibilities','start_timeframe'=>'Desired start timeframe','preferred_location'=>'Preferred talent location'];
        $sections['Skills & working arrangements'] = ['required_skills'=>'Required skills','required_experience'=>'Required experience','working_hours'=>'Preferred working hours'];
        $sections['Equipment & support'] = ['equipment_requirements'=>'Equipment / infrastructure','connectivity_requirements'=>'Connectivity requirements'];
        $sections['Additional information'] = ['notes'=>'Notes'];
    }
    $content = '';
    foreach ($sections as $heading=>$items) {
        $rows = '';
        foreach ($items as $key=>$label) {
            $value = $fields[$key] ?? '';
            if ($value === '') continue;
            $display = nl2br($escape($value), false);
            if ($key === 'work_email') $display = '<a href="mailto:'.$escape($value).'" style="color:#20282b;text-decoration:underline;">'.$display.'</a>';
            $rows .= '<tr><td style="padding:12px 0;border-bottom:1px solid #e4e6e1;font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:25px;word-break:break-word;overflow-wrap:anywhere;"><strong style="display:block;color:#454d4b;font-size:14px;line-height:22px;">'.$escape($label).'</strong><span style="color:#20282b;">'.$display.'</span></td></tr>';
        }
        if ($rows !== '') $content .= '<tr><td style="padding:26px 28px 0;"><h2 style="margin:0 0 8px;font-family:Arial,Helvetica,sans-serif;font-size:20px;line-height:28px;color:#20282b;">'.$escape($heading).'</h2><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;table-layout:fixed;">'.$rows.'</table></td></tr>';
    }
    $ref = $escape($reference);
    $date = $escape($received);
    $email = $escape($fields['work_email']);
    return '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>'.$title.' — iHire Global</title></head>'
        .'<body style="margin:0;padding:0;background:#f4f2eb;color:#20282b;"><div style="display:none;font-size:1px;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">'.$escape($intro).' Reference '.$ref.'</div>'
        .'<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;background:#f4f2eb;"><tr><td align="center" style="padding:24px 12px;">'
        .'<!--[if mso]><table role="presentation" width="640" cellpadding="0" cellspacing="0"><tr><td><![endif]-->'
        .'<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;table-layout:fixed;border-collapse:separate;border-spacing:0;background:#fffefa;border:1px solid #deded5;border-radius:12px;overflow:hidden;">'
        .'<tr><td style="height:7px;background:#ffc62f;font-size:1px;line-height:7px;">&nbsp;</td></tr>'
        .'<tr><td style="padding:28px;background:#20282b;"><p style="margin:0 0 24px;font-family:Arial,Helvetica,sans-serif;font-size:22px;font-weight:bold;line-height:28px;color:#fffefa;">iHire Global<span style="color:#ffc62f;">.</span></p>'
        .'<h1 style="margin:0 0 10px;font-family:Arial,Helvetica,sans-serif;font-size:28px;line-height:36px;color:#fffefa;">'.$title.'</h1>'
        .'<p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:25px;color:#e2e6e3;">'.$escape($intro).'</p></td></tr>'
        .'<tr><td style="padding:18px 28px;background:#fff3c8;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:23px;color:#20282b;"><strong>Reference: '.$ref.'</strong><br>Received: '.$date.'</td></tr>'
        .$content
        .'<tr><td style="padding:28px;"><table role="presentation" cellpadding="0" cellspacing="0"><tr><td bgcolor="#ffc62f" style="border-radius:6px;"><a href="mailto:'.$email.'" style="display:inline-block;padding:14px 22px;border:1px solid #ffc62f;border-radius:6px;font-family:Arial,Helvetica,sans-serif;font-size:16px;font-weight:bold;line-height:24px;color:#20282b;text-decoration:none;">Reply to enquiry &rarr;</a></td></tr></table>'
        .'<p style="margin:14px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:23px;color:#454d4b;">You can also use Reply in your email app to contact the enquirer directly.</p></td></tr>'
        .'<tr><td style="padding:20px 28px;border-top:1px solid #deded5;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:23px;color:#454d4b;">Submitted through the iHire Global website. This is an enquiry, not a quote or commitment.</td></tr></table>'
        .'<!--[if mso]></td></tr></table><![endif]--></td></tr></table></body></html>';
}

$method = $_SERVER['REQUEST_METHOD'] ?? '';
if (!in_array($method, ['GET','POST'], true)) { header('Allow: GET, POST'); fail(405, 'Method not allowed.'); }
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin !== '' && !in_array($origin, ['https://ihireglobal.com','https://www.ihireglobal.com'], true)) fail(403, 'Please use the iHire Global enquiry form.');
if (($_SERVER['HTTP_SEC_FETCH_SITE'] ?? '') === 'cross-site') fail(403, 'Please use the iHire Global enquiry form.');
// Private, bounded anti-abuse state. No enquiry contents or raw IP addresses are stored.
$store = dirname(__DIR__, 2) . '/.ihire-enquiry';
if (!is_dir($store) && !@mkdir($store, 0700, true) && !is_dir($store)) fail(503, 'Enquiries are temporarily unavailable. Please email enquiries@ihireglobal.com.');
$lock = @fopen($store . '/state.json', 'c+');
if (!$lock || !flock($lock, LOCK_EX)) fail(503, 'Please try again shortly.');
@chmod($store . '/state.json', 0600);
$raw = stream_get_contents($lock);
$state = $raw === '' ? ['secret'=>bin2hex(random_bytes(32)), 'events'=>[], 'sent'=>[]] : json_decode($raw, true);
if (!is_array($state) || !isset($state['secret'], $state['events'], $state['sent'])) fail(503, 'Enquiries are temporarily unavailable.');
$now = time();
$state['events'] = array_values(array_filter($state['events'], fn($e) => $e['time'] > $now - 3600));
$state['sent'] = array_filter($state['sent'], fn($e) => $e['time'] > $now - 7200);
function persist($lock, array $state): void {
    rewind($lock); ftruncate($lock, 0); fwrite($lock, json_encode($state)); fflush($lock);
}
if ($method === 'GET') {
    $payload = $now . '.' . bin2hex(random_bytes(16));
    $token = $payload . '.' . hash_hmac('sha256', $payload, $state['secret']);
    persist($lock, $state);
    reply(200, ['token'=>$token]);
}
if ((int)($_SERVER['CONTENT_LENGTH'] ?? 0) > 40000) fail(413, 'Your enquiry is too long.');
if (stripos($_SERVER['CONTENT_TYPE'] ?? '', 'application/json') !== 0) fail(415, 'JSON is required.');
$rawBody = file_get_contents('php://input', false, null, 0, 40001);
if ($rawBody === false || strlen($rawBody) > 40000) fail(413, 'Your enquiry is too long.');
$data = json_decode($rawBody, true);
if (!is_array($data)) fail(400, 'Please check your enquiry.');
$token = $data['token'] ?? '';
if (!is_string($token) || !preg_match('/^(\d{10})\.([a-f0-9]{32})\.([a-f0-9]{64})$/', $token, $parts)) fail(403, 'Please refresh the form and try again.');
if ((int)$parts[1] > $now || $now - (int)$parts[1] > 7200 || !hash_equals(hash_hmac('sha256', $parts[1].'.'.$parts[2], $state['secret']), $parts[3])) fail(403, 'Your form has expired. Please refresh and try again.');
if (($data['website'] ?? '') !== '') fail(400, 'Please check your enquiry.');
$enquiryType = $data['enquiry_type'] ?? 'staffing';
if (!is_string($enquiryType) || !in_array($enquiryType, ['staffing','chat'], true)) fail(422, 'Please choose a valid enquiry type.');
$isChat = $enquiryType === 'chat';
$limits = [
 'message'=>5000,
 'contact_name'=>120,'company_name'=>160,'work_email'=>200,'phone'=>40,'country'=>10,
 'role_title'=>160,'responsibilities'=>5000,'required_skills'=>3000,'required_experience'=>3000,
 'working_hours'=>300,'start_timeframe'=>40,'preferred_location'=>40,'connectivity_requirements'=>2000,'notes'=>5000
];
$fields = [];
foreach ($limits as $key=>$max) {
    $value = $data[$key] ?? '';
    if (!is_string($value) || strlen($value) > $max * 4 || preg_match('/[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]/', $value)) fail(422, 'Please check your enquiry fields.');
    if (function_exists('mb_strlen') && mb_strlen($value, 'UTF-8') > $max) fail(422, 'One of your answers is too long.');
    $fields[$key] = trim($value);
}
$required = $isChat ? ['contact_name','work_email','message'] : ['contact_name','company_name','work_email','country','role_title','responsibilities','required_skills'];
foreach ($required as $key) {
    if ($fields[$key] === '') fail(422, 'Please complete all required fields.');
}
$email = $fields['work_email'];
if (!filter_var($email, FILTER_VALIDATE_EMAIL) || preg_match('/[\r\n]/', $email)) fail(422, 'Please enter a valid email address.');
if (!$isChat) {
$count = filter_var($data['headcount'] ?? null, FILTER_VALIDATE_INT, ['options'=>['min_range'=>1,'max_range'=>1000]]);
if ($count === false) fail(422, 'Please enter a whole number of people between 1 and 1000.');
$options = [
 'country'=>['NZ'=>'New Zealand','AU'=>'Australia','OTHER'=>'Other'],
 'start_timeframe'=>['exploring'=>'Still exploring','as_practical'=>'As soon as practical','one_to_three_months'=>'Within 1–3 months','three_to_six_months'=>'Within 3–6 months'],
 'preferred_location'=>['no_preference'=>'No preference','sri_lanka'=>'Sri Lanka','philippines'=>'Philippines','india'=>'India','fiji'=>'Fiji','recommendation'=>'Open to recommendation']
];
foreach ($options as $key=>$values) {
    if (!isset($values[$fields[$key]])) fail(422, 'Please choose a valid option.');
    $fields[$key] = $values[$fields[$key]];
}
$equipment = ['standard_laptop'=>'Standard laptop setup','additional_monitors'=>'Additional monitor(s)','headset'=>'Headset','specialist_hardware'=>'Specialist hardware','connectivity'=>'Connectivity requirements','power_backup'=>'UPS / power backup','recommend_setup'=>'Unsure / recommend a setup'];
$selected = $data['equipment_requirements'] ?? [];
if (!is_array($selected) || count($selected) > count($equipment)) fail(422, 'Please check equipment requirements.');
foreach ($selected as $item) if (!is_string($item) || !isset($equipment[$item])) fail(422, 'Please check equipment requirements.');
$fields['headcount'] = (string)$count;
$fields['equipment_requirements'] = implode('; ', array_map(fn($key) => $equipment[$key], array_unique($selected)));
}
$key = hash('sha256', $token);
if (isset($state['sent'][$key])) reply(200, ['ok'=>true, 'reference'=>$state['sent'][$key]['reference']]);
$ip = hash_hmac('sha256', $_SERVER['REMOTE_ADDR'] ?? 'unknown', $state['secret']);
$perIp = count(array_filter($state['events'], fn($e) => $e['ip'] === $ip));
if ($perIp >= 5 || count($state['events']) >= 50) { header('Retry-After: 3600'); fail(429, 'Too many attempts. Please try later or email enquiries@ihireglobal.com.'); }
$reference = 'IH-' . gmdate('Ymd') . '-' . strtoupper(bin2hex(random_bytes(4)));
$labels = ['contact_name'=>'Name','company_name'=>'Company','work_email'=>'Work email','phone'=>'Phone','country'=>'Country','role_title'=>'Role / job title','headcount'=>'Number of people required','responsibilities'=>'Main responsibilities','required_skills'=>'Required skills','required_experience'=>'Required experience','working_hours'=>'Preferred working hours','start_timeframe'=>'Desired start timeframe','preferred_location'=>'Preferred talent location','equipment_requirements'=>'Equipment / infrastructure','connectivity_requirements'=>'Connectivity requirements','notes'=>'Additional information'];
$labels = $isChat ? ['contact_name'=>'Name','company_name'=>'Company','work_email'=>'Email','phone'=>'Phone','message'=>'Message'] : $labels;
$enquiryLabel = $isChat ? 'Chat request' : 'Staffing enquiry';
$body = "iHire Global website enquiry\r\nEnquiry type: $enquiryLabel\r\nReference: $reference\r\nReceived (UTC): " . gmdate('c') . "\r\n\r\n";
foreach ($labels as $keyName=>$label) $body .= $label . ': ' . ($fields[$keyName] ?: 'Not specified') . "\r\n\r\n";
$body .= "This is an enquiry, not a quote or commitment. Reply directly to this email to contact the enquirer.\r\n";
$received = (new DateTimeImmutable('now', new DateTimeZone('Pacific/Auckland')))->format('j M Y, g:ia T');
$html = enquiry_html($fields, $reference, $isChat, $received);
$boundary = 'ihire_' . bin2hex(random_bytes(16));
$message = '--'.$boundary."\r\nContent-Type: text/plain; charset=UTF-8\r\nContent-Transfer-Encoding: base64\r\n\r\n".chunk_split(base64_encode($body))
    .'--'.$boundary."\r\nContent-Type: text/html; charset=UTF-8\r\nContent-Transfer-Encoding: base64\r\n\r\n".chunk_split(base64_encode($html))
    .'--'.$boundary."--\r\n";
$headers = ['From'=>'iHire Global <enquiries@ihireglobal.com>','Reply-To'=>$email,'MIME-Version'=>'1.0','Content-Type'=>'multipart/alternative; boundary="'.$boundary.'"'];
$state['events'][] = ['time'=>$now, 'ip'=>$ip];
persist($lock, $state);
$accepted = @mail('enquiries@ihireglobal.com', ($isChat ? 'iHire Global chat request - ' : 'iHire Global enquiry - ') . $reference, $message, $headers, '-fenquiries@ihireglobal.com');
if (!$accepted) { error_log('iHire enquiry mail handoff failed: '.$reference); fail(503, 'We could not send your enquiry. Your answers are still here. Please retry or email enquiries@ihireglobal.com.'); }
$state['sent'][$key] = ['time'=>$now, 'reference'=>$reference];
persist($lock, $state);
reply(200, ['ok'=>true,'reference'=>$reference]);
