import test from 'tape';
import mergeDuplicates from '../util/mergeDuplicates';

test('Merging duplicates', (assert) => {

  const input = [
    {
      "de": "Anlage",
      "nl": [
          "bijl.",
          "bijlage",
        ],
      },
    {
      "de": "Anlage",
      "nl": [
          "bijl.",
          "bijlage",
        ],
      }
    ]

  const expected = [
    {
      "de": "Anlage",
      "nl": [
        "bijl.",
        "bijlage",
      ],
    }
  ];
  const actual = mergeDuplicates(input);

  assert.deepEqual(actual, expected,
    'All German & Dutch duplicates should be merged.');

  assert.end();
});
