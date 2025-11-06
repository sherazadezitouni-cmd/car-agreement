#!/usr/bin/env python3
"""
P2P Vehicle Rental Agreement - VERSION 1 Generator
Standard Professional Style - Times-Roman 12pt
"""

import re
from reportlab.lib.pagesizes import letter
from reportlab.lib.units import inch
from reportlab.lib.colors import black, HexColor
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_JUSTIFY
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak, KeepTogether
from reportlab.platypus import Table, TableStyle


class MarkdownParser:
    """Parse le document markdown en structure exploitable"""

    def __init__(self, filepath):
        self.filepath = filepath
        self.lines = []
        self.contract = {
            'metadata': {},
            'sections': []
        }

    def parse(self):
        """Parse le fichier markdown"""
        with open(self.filepath, 'r', encoding='utf-8') as f:
            self.lines = f.readlines()

        current_section = None
        content_buffer = []

        i = 0
        while i < len(self.lines):
            line = self.lines[i]

            # Titre principal (# )
            if line.startswith('# ') and not line.startswith('## '):
                title = line[2:].strip()
                if 'Peer-to-Peer' in title:
                    self.contract['title'] = title

            # Metadata (Version, Last Updated, Author)
            elif line.startswith('**Version:**'):
                self.contract['metadata']['version'] = line.split('**Version:**')[1].strip()
            elif line.startswith('**Last Updated:**'):
                self.contract['metadata']['date'] = line.split('**Last Updated:**')[1].strip()
            elif line.startswith('**Author:**'):
                self.contract['metadata']['author'] = line.split('**Author:**')[1].strip()

            # Section avec numéro (## 1. TITRE)
            elif re.match(r'^##\s+\d+\.', line):
                # Sauvegarder la section précédente
                if current_section:
                    current_section['content'] = content_buffer
                    self.contract['sections'].append(current_section)
                    content_buffer = []

                # Nouvelle section
                match = re.match(r'^##\s+(\d+)\.\s+(.+)', line)
                if match:
                    num, title = match.groups()
                    current_section = {
                        'number': int(num),
                        'title': title.strip(),
                        'content': []
                    }

            # Section sans numéro (## TITRE)
            elif line.startswith('## ') and not re.match(r'^##\s+\d+\.', line):
                # Sauvegarder la section précédente
                if current_section:
                    current_section['content'] = content_buffer
                    self.contract['sections'].append(current_section)
                    content_buffer = []

                title = line[3:].strip()
                current_section = {
                    'number': None,
                    'title': title,
                    'content': []
                }

            # Contenu
            else:
                if line.strip():  # Ignorer lignes vides dans le buffer
                    content_buffer.append(line)

            i += 1

        # Sauvegarder la dernière section
        if current_section:
            current_section['content'] = content_buffer
            self.contract['sections'].append(current_section)

        return self.contract


class P2PContractV1Generator:
    """Générateur VERSION 1 - Standard Professional"""

    def __init__(self, contract_data):
        self.contract = contract_data
        self.styles = self._create_styles()
        self.page_count = 0

    def _create_styles(self):
        """Crée les styles de paragraphe"""
        styles = {}

        # Titre principal
        styles['title'] = ParagraphStyle(
            'title',
            fontName='Times-Bold',
            fontSize=18,
            alignment=TA_CENTER,
            spaceAfter=12,
            leading=22
        )

        # Titre de section
        styles['section'] = ParagraphStyle(
            'section',
            fontName='Times-Bold',
            fontSize=14,
            alignment=TA_LEFT,
            spaceAfter=8,
            spaceBefore=12,
            leading=17
        )

        # Corps de texte
        styles['body'] = ParagraphStyle(
            'body',
            fontName='Times-Roman',
            fontSize=12,
            alignment=TA_LEFT,
            spaceAfter=6,
            leading=14
        )

        # Corps justifié
        styles['body_justified'] = ParagraphStyle(
            'body_justified',
            fontName='Times-Roman',
            fontSize=12,
            alignment=TA_JUSTIFY,
            spaceAfter=6,
            leading=14
        )

        # Champ à remplir
        styles['field'] = ParagraphStyle(
            'field',
            fontName='Times-Roman',
            fontSize=12,
            alignment=TA_LEFT,
            spaceAfter=4,
            leading=14
        )

        # Bold text
        styles['bold'] = ParagraphStyle(
            'bold',
            fontName='Times-Bold',
            fontSize=12,
            alignment=TA_LEFT,
            spaceAfter=6,
            leading=14
        )

        # Important box
        styles['important'] = ParagraphStyle(
            'important',
            fontName='Times-Bold',
            fontSize=12,
            alignment=TA_LEFT,
            spaceAfter=6,
            leading=14,
            borderWidth=2,
            borderColor=black,
            borderPadding=10
        )

        return styles

    def _header(self, canvas, doc):
        """En-tête des pages (sauf première)"""
        if doc.page > 1:
            canvas.saveState()
            canvas.setFont('Times-Bold', 10)
            canvas.drawCentredString(letter[0]/2, letter[1] - 0.5*inch,
                                    'PEER-TO-PEER VEHICLE RENTAL AGREEMENT')
            canvas.setFont('Times-Roman', 10)
            canvas.drawRightString(letter[0] - 1*inch, letter[1] - 0.5*inch,
                                  f'Page {doc.page}')
            canvas.restoreState()

    def _footer(self, canvas, doc):
        """Pied de page"""
        canvas.saveState()
        canvas.setFont('Times-Roman', 9)
        canvas.drawCentredString(letter[0]/2, 0.5*inch,
                                'Version 2.0 | Last Updated: November 2025 | CharterDocs')
        canvas.drawCentredString(letter[0]/2, 0.35*inch,
                                f'Page {doc.page}')
        canvas.restoreState()

    def _process_line(self, line):
        """Traite une ligne de contenu et retourne un paragraphe"""
        line = line.strip()

        # Ligne vide
        if not line or line == '---':
            return None

        # Sous-titre (###)
        if line.startswith('### '):
            text = line[4:].strip()
            return Paragraph(text, self.styles['bold'])

        # Liste à puces (-)
        if line.startswith('- '):
            text = line[2:].strip()
            # Remplacer les ** par <b></b>
            text = text.replace('**', '<b>', 1).replace('**', '</b>', 1)
            return Paragraph(f'• {text}', self.styles['body'])

        # Ligne avec champ à remplir
        if '_______' in line or '___/___/___' in line or '☐' in line:
            # Remplacer les ** par <b></b>
            text = line.replace('**', '<b>', 1).replace('**', '</b>', 1)
            # Garder les underscores et checkboxes
            return Paragraph(text, self.styles['field'])

        # Texte bold (**texte**)
        if line.startswith('**') and line.endswith('**'):
            text = line.replace('**', '').strip()
            return Paragraph(text, self.styles['bold'])

        # Texte avec bold au milieu
        if '**' in line:
            text = line
            # Remplacer ** par balises HTML
            parts = text.split('**')
            if len(parts) >= 3:
                result = parts[0]
                for i in range(1, len(parts), 2):
                    if i < len(parts):
                        result += f'<b>{parts[i]}</b>'
                    if i+1 < len(parts):
                        result += parts[i+1]
                return Paragraph(result, self.styles['body'])

        # Paragraphe normal
        return Paragraph(line, self.styles['body_justified'])

    def generate(self, output_path):
        """Génère le PDF VERSION 1"""
        # Créer le document
        doc = SimpleDocTemplate(
            output_path,
            pagesize=letter,
            leftMargin=1*inch,
            rightMargin=1*inch,
            topMargin=1*inch,
            bottomMargin=1*inch
        )

        story = []

        # Titre principal
        if 'title' in self.contract:
            title_text = self.contract['title']
            story.append(Paragraph(title_text, self.styles['title']))
            story.append(Spacer(1, 12))

        # Metadata
        if 'metadata' in self.contract:
            meta = self.contract['metadata']
            meta_text = f"<b>Version:</b> {meta.get('version', '')} | "
            meta_text += f"<b>Last Updated:</b> {meta.get('date', '')}"
            story.append(Paragraph(meta_text, self.styles['body']))
            story.append(Spacer(1, 18))

        # Sections
        for section in self.contract['sections']:
            # Titre de section
            if section['number']:
                title = f"{section['number']}. {section['title']}"
            else:
                title = section['title']

            story.append(Paragraph(title, self.styles['section']))
            story.append(Spacer(1, 8))

            # Contenu de la section
            for line in section['content']:
                para = self._process_line(line)
                if para:
                    story.append(para)
                    story.append(Spacer(1, 3))

            story.append(Spacer(1, 12))

        # Construire le PDF
        doc.build(story, onFirstPage=self._footer, onLaterPages=lambda c, d: (self._header(c, d), self._footer(c, d)))

        print(f"✅ VERSION 1 generated: {output_path}")


def main():
    """Fonction principale"""
    # Parser le markdown
    print("📖 Parsing markdown file...")
    parser = MarkdownParser('/home/user/car-agreement/Peer-to-Peer Vehicle Rental Agreement - Universal Master Template.md')
    contract = parser.parse()

    print(f"✅ Parsed {len(contract['sections'])} sections")

    # Générer VERSION 1
    print("\n🔨 Generating VERSION 1 (Standard Professional)...")
    generator = P2PContractV1Generator(contract)
    generator.generate('/home/user/car-agreement/v1-standard-professional.pdf')

    print("\n✅ VERSION 1 COMPLETE!")
    print("📄 File: /home/user/car-agreement/v1-standard-professional.pdf")


if __name__ == '__main__':
    main()
