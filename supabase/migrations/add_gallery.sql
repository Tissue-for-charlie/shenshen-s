CREATE TABLE gallery (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255),
    image_url TEXT NOT NULL,
    category VARCHAR(50),
    -- '写真', '舞台', '生活照'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
INSERT INTO gallery (title, image_url, category)
VALUES (
        '2024舞台写真',
        'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=zhou+shen+stage+performance+blue+lights&image_size=portrait_4_3',
        '舞台'
    ),
    (
        '封面大片',
        'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=zhou+shen+magazine+cover+shoot&image_size=portrait_4_3',
        '写真'
    ),
    (
        '日常瞬间',
        'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=zhou+shen+casual+look+smiling&image_size=portrait_4_3',
        '生活照'
    ),
    (
        '演唱会精彩瞬间',
        'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=zhou+shen+concert+crowd+blue+ocean&image_size=landscape_16_9',
        '舞台'
    );
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read access for gallery" ON gallery FOR
SELECT USING (true);