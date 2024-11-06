import deepl

DEEPL_API_KEY = '22a7531b-5bf5-4e63-a2bd-5cc4620b2abe:fx'
translator = deepl.Translator(DEEPL_API_KEY)
print(translator.translate_text("Software Developer", target_lang="ES").text)