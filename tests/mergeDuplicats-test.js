import test from 'tape';
import mergeDuplicates from '../util/mergeDuplicates';

test('Merging duplicates', (assert) => {

  const input = [
    {
      "id": "55a7bdd97af068e81b7f74c8",
      "de": "Anlage",
      "deUrl": "Anlage",
      "nl": [
          "bijl.",
          "bijlage"
        ],
      "note": "TRAD - Everyday terms and expressions",
      "subjectFields": []
      },
    {
      "id": "55a7bdda7af068e81b7f88f2",
      "de": "Anlage",
      "deUrl": "Anlage",
      "nl": [
          "bijl.",
          "bijlage"
        ],
      "note": "TRAD - Everyday terms and expressions",
      "subjectFields": []
      }
    ]


  const expected = [
    {
      "id": "55a7bdd97af068e81b7f74c8",
      "de": "Anlage",
      "deUrl": "Anlage",
      "nl": [
        "bijl.",
        "bijlage",
        "bijl.",
        "bijlage"
    ],
      "note": "TRAD - Everyday terms and expressions",
      "subjectFields": []
    }
  ];
  const actual = mergeDuplicates(input);

  assert.deepEqual(actual, expected,
    'Dutch translations should be merged.');

  assert.end();
});
